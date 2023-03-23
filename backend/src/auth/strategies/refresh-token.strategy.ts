import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import {Request} from 'express'
import { Injectable } from "@nestjs/common/decorators";

@Injectable()
export class refreshTokenStrategy extends PassportStrategy(Strategy,'jwt-refresh'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
            passReqToCallback:true
        })
    }
    validate(req :Request,payload:any){
        const refreshToken=req.get('authoriszation').replace('Bearer','').trim()
        return {...payload,refreshToken}
    }
}