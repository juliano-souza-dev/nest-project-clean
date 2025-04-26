import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account-controller'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [ConfigModule.forRoot({}), AuthModule],

  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
