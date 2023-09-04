import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserInput, Role } from './dto/create-user.input';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles';
import { ChangeRoleInput } from './dto/changeRole.input';

@ApiTags('User')
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ type: User })
  @Post('create')
  async create(@Body() body: CreateUserInput): Promise<any> {
    return await this.userService.create(body);
  }
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiResponse({ type: [User] })
  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiResponse({ type: User })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @ApiResponse({ type: User })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.update(id, body);
  }

  @Delete()
  async remove(@Param('id') id: number): Promise<any> {
    return await this.userService.remove(id);
  }

  @ApiResponse({ type: User })
  @Patch(':id')
  async changeRole(@Param('id') id: number, @Body() { role }: ChangeRoleInput) {
    return await this.userService.changeRole(id, role);
  }
}
