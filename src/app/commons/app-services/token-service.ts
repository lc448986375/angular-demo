import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalVariable } from "../config/global-variable";

@Injectable()
export class TokenService{
    ACCESS_TOKEN:string = 'access-token';
    TOKEN_DETAILS:string = 'token-details';
    USER_INFO:string = 'user-info';

    jwtService:JwtHelperService;

    constructor(){
        this.jwtService = new JwtHelperService();
    }

    setToken(token){
        if(token == null || token.length == 0){
          localStorage.removeItem(this.ACCESS_TOKEN);
          localStorage.removeItem(this.USER_INFO);
        }else{
          localStorage.setItem(this.ACCESS_TOKEN, token);

          // 使用jwt，则从token中获取用户信息并保存
          if(GlobalVariable.TOKEN_USE_JWT){
            let jwtService = new JwtHelperService();
            let userInfo = jwtService.decodeToken(token);
            localStorage.setItem(this.USER_INFO, JSON.stringify(userInfo));
          }
        }
    }
    setUserInfo(userInfo){
        localStorage.setItem(this.USER_INFO, JSON.stringify(userInfo));
    }
    getToken():string{
        return localStorage.getItem(this.ACCESS_TOKEN);
    }

    getUserInfo():Object{
        let userInfo = localStorage.getItem(this.USER_INFO);
        return JSON.parse(userInfo);
    }

    isTokenExpired(token):boolean{
        if(GlobalVariable.TOKEN_USE_JWT){
            return this.jwtService.isTokenExpired(token);   
        }else{
            return false;
        }
    }
}