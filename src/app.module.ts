import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TaskModule,
    MongooseModule.forRoot('mongodb://localhost/task-app', { useNewUrlParser: true }),
    AuthModule,
    UsersModule
  ],
})
export class AppModule {}
