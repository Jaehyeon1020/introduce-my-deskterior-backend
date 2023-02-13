import { User } from './user.entity';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
}
