import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { Public } from "src/core/decorator/public.decorator";
import { UserData } from "src/core/decorator/user.decorator";
import { AdminGuard } from "src/core/guards/admin.guard";
import { validateStartEndTime } from "src/helpers/utils";
import AdminTaskService from "./admin-task.service";
import { TaskDto } from "./dto/task.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";

@UseGuards(AdminGuard)
@Controller('admin/task')
export default class AdminTaskController {
    constructor(
        private readonly adminTaskService : AdminTaskService
    ){}
    
    @Get('/:id')
    async getTask(@Param('id' , ParseIntPipe) id){
        return  this.adminTaskService.getTask(id);
    }

    @Post('/create')
    async createTask(@Body() body : TaskDto , @UserData('id' , ParseIntPipe) adminId){
        validateStartEndTime(body.start_time , body.end_time);
        return  this.adminTaskService.createTask(body , adminId);
    }

    @Post('/update/:taskId')
    async updateTask(@Body() body : UpdateTaskDto , @Param('taskId' , ParseIntPipe) taskId ) : Promise<any>{
        return  this.adminTaskService.updateTask(body , taskId);
    }

    @Get()
    async getAllTask(@UserData('id' , ParseIntPipe) adminId){
        return  this.adminTaskService.getAllTask(adminId);
    }

    @Delete('/delete/:taskId')
    async deleteTask(@UserData('id' , ParseIntPipe) adminId , @Param('taskId' ,ParseIntPipe) taskId){
        return this.adminTaskService.deleteTask(adminId , taskId);
    }
    
}