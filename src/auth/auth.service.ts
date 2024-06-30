import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import {  RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(

    private userService: UserService,
    private jwtService: JwtService,
  ){}

  async register(registerDto: RegisterDto): Promise<User>{
    return this.userService.createUser(registerDto);
    
  }

  async validateUser(email: string, password: string) {

    const user = await this.userService.findOneByEmail(email);

    if(user && await this.userService.validatePassword(password, user.password)){
      const id = user.id;
      console.log(id);
      return id;
    }

    return null;
  }

  async login(userId: number): Promise<{token: string}>{

    const payload = {sub: userId}

    return {
      token: this.jwtService.sign(payload),
    }
  }

}
