import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Public } from 'src/core/decorator/public.decorator';
import Admin from 'src/database/admin.entity';
import Member from 'src/database/member.entity';
import Task from 'src/database/task.entity';
import { Exception } from 'src/helpers/exception';
import { ErrorCode } from 'src/types/enums/error.enum';
import { In, QueryBuilder, Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export default class AdminTaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async createTask(taskDto: TaskDto, adminId: number): Promise<Task> {
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
    });
    if (!admin)
      throw new Exception(
        ErrorCode.User_Not_Found,
        'không tìm thấy dữ liệu người dùng',
      );
    const task = await this.taskRepository.save({
      title: taskDto.title,
      start_time: taskDto.start_time,
      end_time: taskDto.end_time,
      start_date: taskDto.start_date,
      description: taskDto.description,
      status: taskDto.status,
      admin_id: adminId,
    });
    return task;
  }
  async updateTask(updateTask: UpdateTaskDto, taskId: number): Promise<any> {
    const members = await this.memberRepository.find({
      where: {id : In(updateTask.memberIds)},
    });
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!members) throw new Exception(ErrorCode.Not_Found, 'member not found');
    if (!task) throw new Exception(ErrorCode.Task_Not_Found, 'task not found');
    // const newTask = await this.taskRepository.update(taskId, {
    //   title: updateTask.title,
    //   description: updateTask.description,
    //   end_time: updateTask.end_time,
    //   status: updateTask.status,
    // });
    task.title = updateTask.title;
    task.description = updateTask.description;
    task.end_time = updateTask.end_time;
    task.status = updateTask.status;
    task.members = members;
    await this.taskRepository.save(task);
    return { message: 'update success', task: updateTask.title };
  }

  async getTask(taskId: number) {
    const task = await this.taskRepository
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.members' , 'm')
      .where('t.id = :taskId', { taskId })
      .getOne();
      if (!task) {
        throw new Exception(ErrorCode.Task_Not_Found, 'Not found task');
      }
    return task;
  }

  async getAllTask(adminId : number ){
      const tasks = await this.taskRepository.createQueryBuilder('t').leftJoinAndSelect('t.members' , 'm').getMany();
      if (!tasks) {
        throw new Exception(ErrorCode.Task_Not_Found, 'Not found task');
      }
      return tasks;
  }
  
  async deleteTask(adminId : number , taskId : number) {
      const task = await this.taskRepository.findOne({where : {id : taskId}});
      if (!task) {
        throw new Exception(ErrorCode.Task_Not_Found, 'Not found task!');
      }
      await this.taskRepository.update({ id: taskId }, { status: 2 });
      return {message : `delete success ${task.title}`};
  }

}
