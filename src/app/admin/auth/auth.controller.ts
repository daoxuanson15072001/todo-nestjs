import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/core/decorator/public.decorator';
import { AdminGuard } from 'src/core/guards/admin.guard';
import { Itoken } from 'src/types/interfaces/Itoken';
import { UserData } from '../../../core/decorator/user.decorator';
import AuthService from './auth.service';
import { ChangePasswordDto } from './dto/changePassword.Dto';
import { LoginDto } from './dto/login.Dto';
import { RegisterDto } from './dto/register.Dto';

@Controller('admin/auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() body: LoginDto): Promise<Itoken> {
    return this.authService.login(body);
  }

  @Public()
  @Post('/register')
  async register(@Body() body: RegisterDto): Promise<Itoken> {
    return this.authService.register(body);
  }

  @Post('/changePassword')
  async changePassword(
    @UserData('id' , ParseIntPipe) adminId,
    @Body() body: ChangePasswordDto,
  ) {
    return await this.authService.changePassword(adminId, body);
  }

  @Get('/user')
  async getProfile(@UserData('id' , ParseIntPipe) adminId) {
    return { user: await this.authService.getProfile(adminId) };
  }
  
  @Public()
  @Get('/refreshToken')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<String> {
    return this.authService.refreshToken(refreshToken);
  }

  @Get()
  async findOne(@UserData('email') email) {
    return email;
  }
}

/**
 * 1. 2 role admin vaf user.
 * 2. Admin co quen them task,sua, xoa, assign cho nguoi khac.
 * title, duration, actualhour, description...
 * QUan ly user. themsua xoas.
 *
 */
