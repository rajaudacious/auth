import { Injectable } from '@nestjs/common';
import { UserDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import jwt_decode from "jwt-decode";

interface DecodedToken {
  email: string;
  name: string;
  picture: string;
  email_verified: boolean;
}
@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) { }

  async getInfo(token: string): Promise<any> {
    var { email, name, picture, email_verified }: DecodedToken = jwt_decode(token);
    const user = await this.userModel.findOne({ email: email });
    console.log(user);
    if (!user) {
      await this.userModel.create({ cors: true },{
        email,
        name,
        picture,
        email_verified
      })
    }
    const jwtToken = await this.jwtService.signAsync({ email, name, picture, email_verified })
    return { email, name, picture, email_verified, jwtToken }
  }
}
