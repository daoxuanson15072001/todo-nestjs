import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "src/core/decorator/public.decorator";

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt'){
    constructor(private reflector : Reflector){
        super();
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY ,[
            context.getHandler(),
            context.getClass(),
        ]);
    return isPublic ? true : super.canActivate(context);
    }
}