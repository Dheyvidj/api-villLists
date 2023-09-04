//auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JwtStrategy.jwtSecret, // Substitua pela sua chave secreta
      signOptions: { expiresIn: '1h' }, // Define o tempo de expiração do token
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
