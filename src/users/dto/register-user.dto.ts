
import {
  IsString,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers and underscores',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  displayName: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 128)
  password: string;
}
