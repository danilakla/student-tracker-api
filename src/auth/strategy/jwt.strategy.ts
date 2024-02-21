import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string; role: string }) {
    let user;
    if (payload.role == 'ADMIN') {
     user= await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
    } else if (payload.role == 'TEACHER') {
      user= await this.prisma.teacher.findUnique({
        where: {
          id: payload.sub,
        },
      });
    } else if (payload.role == 'STUDENT') {
      user =await this.prisma.student.findUnique({
        where: {
          id: payload.sub,
        },
      });
    }
    

    delete user.hash;
    return user;
  }
}
