import { IsNotEmpty } from "class-validator";

export class UpdateTaskDto {
    @IsNotEmpty()
    memberIds : number[];
    @IsNotEmpty()
    title : string;
    @IsNotEmpty()
    description : string;
    @IsNotEmpty()
    status : number;
    @IsNotEmpty()
    end_time : string;
}