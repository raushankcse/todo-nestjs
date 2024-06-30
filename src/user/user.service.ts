import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { RegisterDto } from "src/auth/dto/register.dto";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}


 async createUser(registerDto: RegisterDto): Promise<User>{
  const {username, email, password} = registerDto;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    return user;
 }

 async findOneByEmail(email: string): Promise<User | undefined>{
  return this.userRepository.findOne({where: {email}});
 }

 async validatePassword(plainPassword: string, hashedPassword:string): Promise<boolean>{
  return bcrypt.compare(plainPassword, hashedPassword);
 }
}