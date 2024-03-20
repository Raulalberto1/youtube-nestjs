import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_CONSTANT } from "./jwt.constantes";
//import { Strategy as PassportStrategy } from "passport-strategy";

@Injectable()
export class JwtStrategy extends Strategy{
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_CONSTANT.secret
        });
    }

    async validate(payload: any){
        return {userId:payload.id, name: payload.name}
    }
}