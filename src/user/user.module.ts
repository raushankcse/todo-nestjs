import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entity/user.entity";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";



@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers:[UserController],
  providers:[UserService],
  exports:[UserService],
})
export class UserModule{}