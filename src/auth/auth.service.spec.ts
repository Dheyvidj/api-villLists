import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

const userMocked: User = new User({
  id: 1,
  active: true,
  email: 'teste@gmail',
  name: 'Teste',
  password: '$2a$10$CbfdeLuSUIC.0tIth.cQEeRAYa0k8FQEye4sVHaSOiWT3eiL7LYeO',
  role: 'admin',
  createdAt: new Date(),
});

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest
              .fn()
              .mockResolvedValue('aslçdçk20d-k2-0mklnqgd832g8aibdiqbd8'),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue(userMocked),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('gerarToken', () => {
    it('retornar dados do login como token e refresh token', async () => {
      //Act
      const result = await service.gerarToken(userMocked);
      console.log(result);

      //Assert
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('refresh_token');
    });
  });

  describe('realizar login do usuario', () => {
    it('deve retornar dados do login como token e refresh token', async () => {
      //Act
      const result = await service.login(userMocked.email, 'testepassword123');
      console.log(result);

      //Assert
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('refresh_token');
    });
  });
});
