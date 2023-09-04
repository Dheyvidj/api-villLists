// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { PrismaService } from '../prisma.service';
// import { LoginResponse } from './dto/login-dto';

// const loginResponse: LoginResponse = new LoginResponse({
//   email: 'test@gmail.com',
//   id: 1,
//   name: 'test',
//   role: 'admin',
//   token: '<KEY>',
//   refresh_token: '<KEY>',
// });

// describe('AuthController', () => {
//   let controller: AuthController;
//   let service: AuthService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [
//         {
//           provide: AuthService,
//           useValue: {
//             validarUsuario: jest.fn().mockResolvedValue(loginResponse),
//             reautenticar: jest.fn().mockResolvedValue(loginResponse),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<AuthController>(AuthController);
//     service = module.get<AuthService>(AuthService);
//   });

//   it('shold be defined', () => {
//     expect(controller).toBeDefined();
//     expect(service).toBeDefined();
//   });

//   describe('login', () => {
//     it('should returns user login', async () => {
//       //Act
//       const result = await controller.login({
//         email: '<EMAIL>',
//         password: '<PASSWORD>',
//       });
//       //Assert
//       expect(result).toEqual(loginResponse);
//     });
//   });

//   describe('refreshToken', () => {
//     it('should returns user login', async () => {
//       //Act
//       const result = await controller.refreshToken({
//         refresh_token: '<REFRESH_TOKEN>',
//       });
//       //Assert
//       expect(result).toEqual(loginResponse);
//     });
//   });
// });
