import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const UserData = createParamDecorator((data : string , ctx : ExecutionContext) => {
    const req : Request = ctx.switchToHttp().getRequest();
    const user = req.user;
    return data ? user?.[data] : user;
})