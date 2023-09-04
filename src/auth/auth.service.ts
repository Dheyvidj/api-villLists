//auth.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LoginResponse } from './dto/login-dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}
  async login(email: string, password: string): Promise<LoginResponse> {
    const user: User = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (user === null) {
      throw new BadRequestException('Email incorreto');
    }
    if (user.active === false) {
      throw new BadRequestException('Usuário inativo');
    }
    const senhaCorreta = await bcrypt.compare(password, user.password);
    if (!senhaCorreta) {
      throw new BadRequestException('Senha incorreta');
    }
    return this.gerarToken(user);
  }

  async gerarToken(payload: User): Promise<LoginResponse> {
    const token = this.jwtService.sign({
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    });

    const refreshToken = this.jwtService.sign(
      {
        id: payload.id,
      },
      {
        secret: JwtStrategy.jwtSecretRefresh,
        expiresIn: '30d',
      },
    );
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,

      token: token,
      refresh_token: refreshToken,
    };
  }

  async reautenticar(body) {
    const payload: any = await this.verificarRefreshToken(body);
    return this.gerarToken(payload);
  }

  private async verificarRefreshToken(body) {
    const refreshToken = body.refresh_token;
    if (!refreshToken) {
      throw new NotFoundException('Refresh Token não encontrado');
    }
    const idUser = this.jwtService.decode(refreshToken)['id'];
    const usuario: User = await this.prisma.user.findUnique({
      where: { id: idUser },
    });
    if (usuario === null) {
      throw new NotFoundException('Usuário não encontrado');
    }
    if (usuario.active === false) {
      throw new BadRequestException('Usuário inativo');
    }
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: JwtStrategy.jwtSecretRefresh,
      });
      return usuario;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }
}
