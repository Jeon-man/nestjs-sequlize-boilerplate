import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterBody {
  @ApiProperty()
  @IsString()
  name: string;
}

export class LoginBody {
  @ApiProperty()
  @IsString()
  name: string;
}
