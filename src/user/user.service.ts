import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    return await this.prisma.user
      .create({ data: { ...createUserInput } })
      .catch((error: PrismaClientKnownRequestError) => {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ja existe um usuário com esse e-email',
          );
        }
        throw new BadRequestException();
      });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany().catch(() => {
      throw new BadRequestException();
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.prisma.user
      .findUnique({ where: { id } })
      .then((response) => {
        if (!response) {
          throw new NotFoundException();
        }
        return response;
      })
      .catch(() => {
        throw new BadRequestException(`Usuário com o id ${id} não enontrado`);
      });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: updateUserInput.email,
        name: updateUserInput.name,
        active: updateUserInput.active,
        password: updateUserInput.newPassword,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id: id } });
  }

  async changeRole(id: number, role: string) {
    return await this.prisma.user.update({
      where: { id: id },
      data: { role: role },
    });
  }
}
