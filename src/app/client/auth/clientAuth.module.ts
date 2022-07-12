import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import JwtAuthService from "src/app/shared/auth/jwtAuth.service";
import Member from "src/database/member.entity";
import ClientAuthController from "./clientAuth.controller";
import ClientAuthService from "./clientAuth.service";

@Module({
    imports : [TypeOrmModule.forFeature([Member]) , PassportModule],
    controllers : [ClientAuthController],
    providers : [ClientAuthService , JwtAuthService , JwtService],
})
export default class ClientAuthModule{}