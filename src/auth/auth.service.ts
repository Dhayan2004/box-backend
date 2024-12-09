import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CLIENT_ID } from 'src/secrets/const';
import { UserService } from 'src/user/user.service';
import { AuthInputDto } from './dto/auth-input.dto';
import { AuthGoogleDto } from './dto/auth-google.dto';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    this.googleClient = new OAuth2Client(CLIENT_ID);
  }

  async login(user: AuthInputDto) {
    try {
      const { email, password } = user;
      const findUser = await this.prisma.user.findFirst({ where: { email } });
      if (!findUser) {
        throw new NotFoundException('USER_NOT_FOUND');
      }
      const comparePassword = await bcrypt.compare(password, findUser.password);
      if (!comparePassword) {
        throw new ForbiddenException('INCORRECT_PASSWORD');
      }
      const payload = { id: findUser.id, name: findUser.email };
      const token = await this.jwtService.signAsync(payload);
      return { token };
    } catch (e) {
      if (e instanceof NotFoundException || e instanceof ForbiddenException) {
        throw e;
      }
      throw new InternalServerErrorException('ERROR_INNESPERADO', e);
    }
  }

  async authGoogle(googleData: AuthGoogleDto) {
    try {
      const idToken = await this.googleClient.verifyIdToken({
        idToken: googleData.idToken,
        audience: CLIENT_ID,
      });
      const payload = idToken.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Invalid Google token payload');
      }

      if (!payload.email) {
        throw new UnauthorizedException('Email not provided in Google token');
      }

      if (!payload.email_verified) {
        throw new UnauthorizedException('Google account email is not verified');
      }

      let user = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (!user) {
        user = await this.userService.createUser({
          email: payload.email,
          family_name: payload.family_name,
          given_name: payload.given_name,
          picture: payload.picture,
          name: payload.name,
          verified_email: payload.email_verified,
          phone: null,
          password: this.generateRandomPassword(),
        });
      }
    } catch (e) {
      throw new InternalServerErrorException('ERROR_INNESPERADO', e);
    }
  }

  generateRandomPassword(length = 16) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = lowercase + uppercase + numbers + symbols;

    let password = '';
    const randomBytes = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
      const randomIndex = randomBytes[i] % allChars.length;
      password += allChars[randomIndex];
    }

    return password;
  }
}
