import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb+srv://company:company123@cluster0.4no35j8.mongodb.net/project?retryWrites=true&w=majority'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
