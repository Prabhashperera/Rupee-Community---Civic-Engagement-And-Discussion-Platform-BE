import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly UserRepo: Repository<User>,
    ) {}


    async createUser(dto: RegisterUserDto): Promise<User> {
        const username = dto.username.trim().toLowerCase()
        const hashedPassword = await argon2.hash(dto.password, {
            type: argon2.argon2id
        });
        const user = this.UserRepo.create({
            username,
            displayName: dto.displayName.trim(),
            password: hashedPassword
        });

        try {
            return await this.UserRepo.save(user)
        }catch(err: any) {
            if (err.code === '23505') {
                throw new ConflictException('Username already exists');
            }
            throw err;
        }
    }
}
