import { IsString } from 'class-validator';

export class RegisterBody {
  @IsString()
  name: string;
}

export class LoginBody {
  @IsString()
  name: string;
}
