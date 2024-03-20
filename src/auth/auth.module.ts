import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from './jwt.constantes';

@Module({
  imports:[MongooseModule.forFeature(
    [
      {
        name:User.name,
        schema:UserSchema,
      }
    ]),
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANT.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
