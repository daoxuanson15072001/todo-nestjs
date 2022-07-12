import { IsNotEmpty } from "class-validator";

export class TaskDto{
    @IsNotEmpty()
    title : string;
    @IsNotEmpty()
    start_time : string;
    @IsNotEmpty()
    end_time : string;
    @IsNotEmpty()
    start_date : string;
    @IsNotEmpty()
    description : string;
    @IsNotEmpty()
    status : number;
}