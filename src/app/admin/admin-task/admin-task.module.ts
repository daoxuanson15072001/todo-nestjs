import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Member from "src/database/member.entity";
import Task from "src/database/task.entity";
import AdminTaskController from "./admin-task.controller";
import AdminTaskService from "./admin-task.service";
import Admin from "src/database/admin.entity";

@Module({
    imports : [TypeOrmModule.forFeature([Admin , Task , Member])],
    providers : [AdminTaskService],
    controllers : [AdminTaskController],
})
export default class AdminTaskModule{}