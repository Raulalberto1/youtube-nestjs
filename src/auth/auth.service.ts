import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtAuthService:JwtService
  ){}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async register(userObject: RegisterAuthDto){
    const {password} = userObject
    const plainToHash = await hash(password, 10)
    userObject = {...userObject, password:plainToHash}
    return this.userModel.create(userObject)
  }

  async login( userObjectLogin: LoginAuthDto){
    const {email, password} = userObjectLogin
    const findUser = await this.userModel.findOne({email})
    if(!findUser) throw new HttpException('USER_NOT_FOUND',404)
    
    const checkPassword = await compare(password, findUser.password)

    if(!checkPassword) throw new HttpException('PASSWORD_INVALID', HttpStatus.FORBIDDEN)

    const payload = {id:findUser._id, name: findUser.name}
    const token = this.jwtAuthService.sign(payload)
    const data = {
      user:findUser,
      token,
    }

    return data
  }
}
