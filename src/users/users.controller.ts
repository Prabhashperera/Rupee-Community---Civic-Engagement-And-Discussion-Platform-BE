import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { RegisterUserDto } from './dto/register-user.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() registerDto: RegisterUserDto): Promise<UserResponseDto> {
      const response = this.usersService.createUser(registerDto);
      return new UserResponseDto("User Created Successfully!", response);
  }

  
}
