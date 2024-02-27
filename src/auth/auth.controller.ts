import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto, AuthDto } from './dto';
import { GetUser } from './decorator/get-user.decorator';
import { userInfo } from 'os';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './guard';

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

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)

  @Get('user-credential')
  getUserInfo(
    @GetUser() user
  ): any{
    return user
  }
}
