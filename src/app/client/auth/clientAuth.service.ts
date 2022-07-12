import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcrypt";
import JwtAuthService from "src/app/shared/auth/jwtAuth.service";
import Member from "src/database/member.entity";
import { Exception } from "src/helpers/exception";
import { ErrorCode, UserType } from "src/types/enums/error.enum";
import { Itoken } from "src/types/interfaces/Itoken";
import { Repository } from "typeorm";

@Injectable()
export default class ClientAuthService {
    constructor(
        @InjectRepository(Member) private memberRepository : Repository<Member>,
        private jwtAuthservice : JwtAuthService
    ){}
    async login({email , password}):Promise<Itoken>{
        const member = await this.memberRepository.findOne({
            where : {email},
            select : ['id' , 'email' , 'password' , 'refreshToken']
        });
        if(!member) throw new Exception(ErrorCode.User_Not_Found , 'member Not Found');
    
        const isTruePassword = await compare(password , member.password);
        if(!isTruePassword){
            throw new Exception(ErrorCode.Email_Or_Password_Not_valid , 'Email or Password not valid');
        }
        
        return this.genarateToken(this.memberRepository , member);
    }

    //register
    
    //getMember
    async getMember(){
        return await this.memberRepository.find();
    }

    async genarateToken(
        memberRepository: Repository<Member>,
        member: Member,
      ): Promise<Itoken> {
        const payload = { id: member.id, email: member.email , userType: UserType.CLIENT };
        const accessToken = this.jwtAuthservice.genarateAccessToken(payload);
        const isPayload = this.jwtAuthservice.verifyRefreshToken(member.refreshToken);
        if(!isPayload){
            const refreshToken = this.jwtAuthservice.genarateRefreshToken(payload);
            await memberRepository.update(member.id , {refreshToken : refreshToken});
            return {accessToken : accessToken , refreshToken : refreshToken};
        }
        return {accessToken : accessToken , refreshToken : member.refreshToken};
    }
}
