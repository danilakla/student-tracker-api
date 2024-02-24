import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto, AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: UserDto) {
  
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Post('signup-teacher')
  signupteacher(@Body() dto: UserDto) {
    return this.authService.signupteacher(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin-teacher')
  signinteacher(@Body() dto: AuthDto) {
    return this.authService.signinteacher(dto);
  }

  @Post('signup-student')
  signupStudent(@Body() dto: UserDto) {
    return this.authService.signupStudent(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin-student')
  signinStudent(@Body() dto: AuthDto) {
    return this.authService.signinStudent(dto);
  }
}
