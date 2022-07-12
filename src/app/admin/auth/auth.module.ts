import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import JwtStrategy from "src/app/shared/auth/jwt.strategy";
import JwtAuthService from "src/app/shared/auth/jwtAuth.service";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import Member from "src/database/member.entity";
import Task from "src/database/task.entity";
import Admin from "src/database/admin.entity";

@Module({
    imports : [TypeOrmModule.forFeature([Admin , Member , Task]) , PassportModule],
    providers : [AuthService , JwtService  , JwtStrategy , JwtAuthService],
    controllers : [AuthController],
})
export default class AuthModule{};
