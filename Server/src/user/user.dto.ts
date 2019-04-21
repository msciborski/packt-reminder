import { IsString } from 'class-validator';

class RegisterUserDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;

  public topics: string[];
}

export default RegisterUserDto;