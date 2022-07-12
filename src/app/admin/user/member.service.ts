import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exception } from 'src/helpers/exception';
import { ErrorCode } from 'src/types/enums/error.enum';
import { Repository } from 'typeorm';
import { MemberDto } from './dto/member.dto';
import * as bcrypt from 'bcrypt';
import Member from 'src/database/member.entity';

@Injectable()
export default class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async getMember(): Promise<Member[]> {
    const member = await this.memberRepository.find();
    if (!member)
      throw new Exception(
        ErrorCode.User_Not_Found,
        'không tìm thấy dữ liệu người dùng',
      );
    return member;
  }

  async getMemberById(memberId: number): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { id: memberId } });
    if (!member)
      throw new Exception(
        ErrorCode.User_Not_Found,
        'không tìm thấy dữ liệu người dùng',
      );
    return member;
  }

  async createMember(memberDto: MemberDto): Promise<Member> {
    const isEmail = await this.memberRepository.findOne({
      where: { email: memberDto.email },
    });
    if (isEmail)
      throw new Exception(
        ErrorCode.Email_Already_Exist,
        'Email Already Exist',
        400,
      );
    const newMember = this.memberRepository.save({
      email: memberDto.email,
      password: await bcrypt.hash(memberDto.password, 10),
      name: memberDto.name,
      status: memberDto.status,
      birthday : memberDto.birthday,
    });
    return newMember;
  }

  async updateMemberById(memberId: number, memberDto: MemberDto): Promise<any> {
    const member = await this.memberRepository.update(memberId, {
      email: memberDto.email,
      password: await bcrypt.hash(memberDto.password, 10),
      name: memberDto.name,
      status: memberDto.status,
    });
    if (!member)
      throw new Exception(
        ErrorCode.User_Not_Found,
        'không tìm thấy dữ liệu người dùng',
      );
    return { status: `update success ${memberDto.email}`, member: member };
  }
  async deleteMember(userId: number): Promise<any> {
    await this.memberRepository.delete(userId);
    return { status: 'delete user success' };
  }
}
