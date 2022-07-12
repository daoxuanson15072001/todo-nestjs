import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Public } from "src/core/decorator/public.decorator";
import { AdminGuard } from "src/core/guards/admin.guard";
import { ClientGuard } from "src/core/guards/client.guard";
import { Itoken } from "src/types/interfaces/Itoken";
import ClientAuthService from "./clientAuth.service";
import { LoginDto } from "./dto/clientLogin.dto";

@UseGuards(ClientGuard)
@Controller('/client')
export default class ClientAuthController{
    constructor(private readonly clientAuthService : ClientAuthService){}

    @Public()
    @Post('/login')
    async login(@Body() loginDto : LoginDto): Promise<Itoken>{
        return this.clientAuthService.login(loginDto);
    }
    
    @Get()
    async getMember(){
        return await this.clientAuthService.getMember();
    }
}