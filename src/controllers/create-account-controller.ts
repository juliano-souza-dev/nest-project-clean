import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import { hash } from 'bcrypt'

const createAcccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})
@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAcccountBodySchema))
  async handle(@Body() body: any) {
    const { name, email, password } = body

    const userWithTheSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (userWithTheSameEmail) {
      throw new ConflictException('User with same email already exists.')
    }

    const hashPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    })
  }
}
