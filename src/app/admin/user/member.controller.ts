import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/core/guards/admin.guard';
import Member from 'src/database/member.entity';
import { MemberDto } from './dto/member.dto';
import MemberService from './member.service';

@UseGuards(AdminGuard)
@Controller('admin')
export default class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/user')
  async getUser(): Promise<Member[]> {
    return await this.memberService.getMember();
  }

  @Get('/user/:id')
  async getUserById(@Param('id', ParseIntPipe) id): Promise<Member> {
    return await this.memberService.getMemberById(id);
  }

  @Post('/user/create')
  async createUser(@Body() body : MemberDto) : Promise<Member>{
    return await this.memberService.createMember(body);
  }

  @Put('/user/update/:id')
  async updateUserById(
    @Param('id', ParseIntPipe) id,
    @Body() body: MemberDto,
  ): Promise<any> {
    return await this.memberService.updateMemberById(id, body);
  }

  @Delete('/user/delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id): Promise<any> {
    return await this.memberService.deleteMember(id);
  }
}
