import { IsString } from 'class-validator';

class LoginDto {
  @IsString()
  public email: string;
  public password: string;
}

export default LoginDto;