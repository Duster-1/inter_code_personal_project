import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly ACCESS_TOKEN_EXPIRES_IN = '10s';
  private readonly REFRESH_TOKEN_EXPIRES_IN = '1d';
  private readonly JWT_SECRET = '$up3r$3cretK3y!2025';

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.JWT_SECRET,
        expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.JWT_SECRET,
        expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
      }),
    };
  }

  async register(username: string, password: string) {
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    const user = await this.usersService.create({ username, password });
    return this.login(user);
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: this.JWT_SECRET });
      const user = await this.usersService.findById(payload.sub);
      if (!user) throw new UnauthorizedException('User not found');
      return this.login(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  

  async getMeFromToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.JWT_SECRET,
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user) throw new UnauthorizedException('User not found');

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
