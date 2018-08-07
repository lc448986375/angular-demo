/*
 * 用户登陆认证 
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-08 17:02:29 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-08-03 13:23:38
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../config/global-variable';
import { LogService } from './log-service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from './message-service';
import { HttpService } from './http-service';
import { TokenService } from './token-service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '../../../../node_modules/@angular/common/http';

@Injectable()
export class AuthService {

  redirectUrl: string;  

  constructor(private log:LogService, private translate:TranslateService, private msg:MessageService, private httpService:HttpService, private token:TokenService, private router: Router, private httpClient:HttpClient){
  }

  login(username, password): Observable<any> {
    // header使用x-www-form-urlencoded请求
    let headers = {};
    let data:any = null;
    if(GlobalVariable.TOKEN_API_HEADER_USE_FORM){
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }

      data = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password')
      .set('scope', 'app');
    }else{
      data = {
        username:username,
        password:password
      };
    }

    return this.httpService.request(GlobalVariable.BASE_API_URL + GlobalVariable.VERSION + GlobalVariable.API_LOGIN, "POST", data, {
      useAuthHeader:false,
      headers:headers
    });
  }

  // 获取用户信息
  getUserInfo(){
    return this.httpService.request(GlobalVariable.API_USER_INFO, "GET");
  }

  logout(): void {
    this.httpService.post(GlobalVariable.BASE_API_URL + GlobalVariable.VERSION + GlobalVariable.API_LOGOUT, {}, () => {
      this.token.setToken(null);
      // 跳转到登陆页面
      this.router.navigate(['/login']);
    });
  }

  logined(){
    let token = this.token.getToken();
    if(token == null || token.length == 0){
      this.log.warn('没有登录');
      this.translate.get('login.unlogin').subscribe(res => {
        this.msg.error(res);
      });
      return false;
    }
    if(this.token.isTokenExpired(token)){
      this.log.warn('登录超时');
      this.translate.get('login.login-timeout').subscribe(res => {
        this.msg.error(res);
      });
      return false;
    }

    return true;  
  
  }
}