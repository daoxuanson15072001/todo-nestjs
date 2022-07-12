import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import Admin from 'src/database/admin.entity';
import AdminTaskModule from './app/admin/admin-task/admin-task.module';
import AuthModule from './app/admin/auth/auth.module';
import MemberModule from './app/admin/user/member.module';
import ClientAuthModule from './app/client/auth/clientAuth.module';
import JwtAuthGuard from './app/shared/auth/jwt-auth.guard';
import Member from './database/member.entity';
import Task from './database/task.entity';

@Module({
  imports: [AuthModule , MemberModule, AdminTaskModule ,ClientAuthModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'nestjs',
    synchronize: true,
    logging: false,
    entities: [Admin , Member , Task],
    migrations: [],
    subscribers: [],
  })
  ],
  controllers: [],
  providers: [
    {
      provide : APP_GUARD,
      useClass : JwtAuthGuard
    },
  ],
})
export class AppModule {}
