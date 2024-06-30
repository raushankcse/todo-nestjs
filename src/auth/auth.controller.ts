import { BadRequestException, Body, Controller, Post, Request, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() resgisterDto: RegisterDto){
    const user = await this.authService.register(resgisterDto);
    if(!user){
      throw new BadRequestException;
    }

    return {message: "user registered successfully"};
  }



  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto){
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if(!user){
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
  
}
