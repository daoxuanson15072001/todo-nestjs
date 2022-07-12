import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Itoken } from 'src/types/interfaces/Itoken';
import { Repository } from 'typeorm';
import { Exception } from 'src/helpers/exception';
import { ErrorCode, UserType } from 'src/types/enums/error.enum';
import { compare } from 'bcrypt';
import JwtAuthService from 'src/app/shared/auth/jwtAuth.service';
import { RegisterDto } from './dto/register.Dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/changePassword.Dto';
import Admin from 'src/database/admin.entity';

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private jwtAuthservice : JwtAuthService,
  ) {}
  
  async login({email , password}):Promise<Itoken>{
    const admin = await this.adminRepository.findOne({
        where : {email},
        select : ['id' , 'email' , 'password' , 'refreshToken']
    });
    if(!admin) throw new Exception(ErrorCode.User_Not_Found , 'admin Not Found');

    const isTruePassword = await compare(password , admin.password);
    if(!isTruePassword){
        throw new Exception(ErrorCode.Email_Or_Password_Not_valid , 'Email or Password not valid');
    }
    
    return this.genarateToken(this.adminRepository , admin);
  }

  //register
  async register(admin : RegisterDto) : Promise<Itoken>{
      const isEmail = await this.adminRepository.findOne({
        where : {email : admin.email}
      })
      if(isEmail) throw new Exception(ErrorCode.Email_Already_Exist , 'Email Already Exist', 400);
      const newadmin = await this.adminRepository.save({
          email : admin.email,
          password : await bcrypt.hash(admin.password , 10),
      });
      return this.genarateToken(this.adminRepository , newadmin);
  }
  
  async changePassword(adminId : number , data : ChangePasswordDto){
      const admin = await this.adminRepository.findOne({where : {id : adminId}});
      //console.log(admin)
      if(!admin) throw new Exception(ErrorCode.Not_Found_User , "admin not found");
      if(!await compare(data.oldPassword , admin.password)){
          throw new Exception(ErrorCode.Email_Or_Password_Not_valid , 'password sai');
      }
      if(await compare(data.newPassword , admin.password)){
        throw new Exception(ErrorCode.Duplicate_Old_Password , 'password moi giong password cu');
      }
      await this.adminRepository.update(adminId, {password : await bcrypt.hash(data.newPassword , 10)});
      return {message : 'update succes' , status : 200 , email : admin.email};
  }
  //getprofile
  async getProfile(adminId : number): Promise<Admin> {
    return await this.adminRepository.findOne({where : {id : adminId}});
  }

  //refreshToken
  async refreshToken(refreshToken: string): Promise<string> {
    const payload = this.jwtAuthservice.verifyRefreshToken(refreshToken);
    if (!payload) throw new UnauthorizedException('You have provided invalid refresh token');
    const admin = await this.adminRepository.findOne({where : {id : payload.id} , select : ['id' , 'refreshToken']});
    if (refreshToken !== admin.refreshToken ) throw new UnauthorizedException('Your refresh token changed, please login again');
    const result = await this.genarateToken(this.adminRepository , admin);
    return result?.accessToken;
  }


  async genarateToken(
    adminRepository: Repository<Admin>,
    admin: Admin,
  ): Promise<Itoken> {
    const payload = { id: admin.id, email: admin.email , userType: admin.isSuperAdmin ? UserType.SUPER_ADMIN : UserType.ADMIN  };
    const accessToken = this.jwtAuthservice.genarateAccessToken(payload);
    const isPayload = this.jwtAuthservice.verifyRefreshToken(admin.refreshToken);
    if(!isPayload){
        const refreshToken = this.jwtAuthservice.genarateRefreshToken(payload);
        await adminRepository.update(admin.id , {refreshToken : refreshToken});
        return {accessToken : accessToken , refreshToken : refreshToken};
    }
    return {accessToken : accessToken , refreshToken : admin.refreshToken};
  }
}
