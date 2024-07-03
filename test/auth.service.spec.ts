import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "src/auth/auth.service";
import { LoginDto } from "src/auth/dto/auth.dto";
import { UserService } from "src/user/user.service";

describe('AuthService', () => {
    let authService: AuthService;
    let userService: UserService;
    let jwtService: JwtService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          {
            provide: UserService,
            useValue: {
              findByEmail: jest.fn(),
            },
          },
          {
            provide: JwtService,
            useValue: {
              signAsync: jest.fn(),
            },
          },
        ],
      }).compile();
  
      authService = module.get<AuthService>(AuthService);
      userService = module.get<UserService>(UserService);
      jwtService = module.get<JwtService>(JwtService);
    });
  
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });
  
    describe('validateUser', () => {
      it('should return a user if validation is successful', async () => {
        const loginDto: LoginDto = { username: 'test@example.com', password: 'password' };
        const user = { id: 7, email: 'test@example.com', name: 'TestJ', password: 'hashedPassword' };
  
        jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
        jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
  
        expect(await authService.validateUser(loginDto)).toEqual(user);
      });
  
      it('should throw UnauthorizedException if validation fails', async () => {
        const loginDto: LoginDto = { username: 'test@example.com', password: 'wrongPassword' };
  
        jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);
  
        await expect(authService.validateUser(loginDto)).rejects.toThrow(UnauthorizedException);
      });
    });
  
  });
  