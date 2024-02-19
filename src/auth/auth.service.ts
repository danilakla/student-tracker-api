import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, UserDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private cryptoService: CryptoService
  ) {}

  async signup(dto: UserDto) {

    
    
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          lastName:dto.lastName,
          firstName:dto.firstName,
        },
      });

      return this.signToken(user.id, user.email, "ADMIN");
    } catch (error) {
  
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        }
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    return this.signToken(user.id, user.email, "ADMIN");
  }


  async signupteacher(dto: UserDto) {

     try {
    
    const hash = await argon.hash(dto.password);
    const [id, univer]= (await this.cryptoService.decryptString(dto.teacherSecretKey)).split("$");
    
    const userAdmin =
      await this.prisma.user.findUnique({
        where: {
          id: +id,
          university:{
            name:univer
          }
        }
      });
    if (!userAdmin)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
      const user = await this.prisma.teacher.create({
        data: {
          email: dto.email,
          hash,
          lastName:dto.lastName,
          firstName:dto.firstName,
          userId:userAdmin.id
        },
      });

      return this.signToken(user.id, user.email, "TEACHER");
    } catch (error) {
  
      throw error;
    }
  }

  async signinteacher(dto: AuthDto) {
    // find the user by email
    const user =
      await this.prisma.teacher.findUnique({
        where: {
          email: dto.email,
        }
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    return this.signToken(user.id, user.email, "TEACHER");
  }


  

  async signToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      role,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15000m',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }


}
