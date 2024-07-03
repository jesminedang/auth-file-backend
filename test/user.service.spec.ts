import { ConflictException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { hash } from "bcrypt";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "src/user/dto/user.dto";
import { UserService } from "src/user/user.service";

describe('UserService', () => {
    let userService: UserService;
    let prismaService: PrismaService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UserService,
          {
            provide: PrismaService,
            useValue: {
              user: {
                findUnique: jest.fn(),
                create: jest.fn(),
              },
            },
          },
        ],
      }).compile();
  
      userService = module.get<UserService>(UserService);
      prismaService = module.get<PrismaService>(PrismaService);
    });
  
    it('should be defined', () => {
      expect(userService).toBeDefined();
    });
  
    describe('create', () => {
      it('should create a new user successfully', async () => {
        const createUserDto: CreateUserDto = {
            email: 'test@example.com', password: 'password',
            name: 'TestJ'
        };
        const hashedPassword = await hash(createUserDto.password, 10);
        const newUser = { id: 7, email: 'test@example.com', password: hashedPassword };
  
        (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);
        (prismaService.user.create as jest.Mock).mockResolvedValue(newUser);
  
        const result = await userService.create(createUserDto);
        expect(result).toEqual({ id: 7, email: 'test@example.com' });
      });
  
      it('should throw ConflictException if email is duplicated', async () => {
        const createUserDto: CreateUserDto = {
            email: 'test@example.com', password: 'password',
            name: 'TestJ'
        };
        const existingUser = { id: 5, email: 'test@example.com', password: 'hashedPassword' };
  
        (prismaService.user.findUnique as jest.Mock).mockResolvedValue(existingUser);
  
        await expect(userService.create(createUserDto)).rejects.toThrow(ConflictException);
      });
    });
  
    describe('findByEmail', () => {
      it('should return a user by email', async () => {
        const email = 'test@example.com';
        const user = { id: 7, email: 'test@example.com', password: 'hashedPassword' };
  
        (prismaService.user.findUnique as jest.Mock).mockResolvedValue(user);
  
        const result = await userService.findByEmail(email);
        expect(result).toEqual(user);
      });
    });
  
    describe('findById', () => {
      it('should return a user by id', async () => {
        const id = 7;
        const user = { id: 7, email: 'test@example.com', password: 'hashedPassword' };
  
        (prismaService.user.findUnique as jest.Mock).mockResolvedValue(user);
  
        const result = await userService.findById(id);
        expect(result).toEqual(user);
      });
    });
  });
  