import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Member from "src/database/member.entity";
import Task from "src/database/task.entity";
import User from "src/database/admin.entity";
import MemberController from "./member.controller";
import MemberService from "./member.service";


@Module({
    imports : [TypeOrmModule.forFeature([User , Task , Member])],
    providers : [MemberService],
    controllers : [MemberController]
})
export default class MemberModule {};
