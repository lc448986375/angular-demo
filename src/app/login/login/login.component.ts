/*
 * 登陆页面
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-08 16:38:16 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-07-31 15:00:23
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../commons/app-services/auth-service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GlobalVariable } from '../../commons/config/global-variable';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../../commons/app-services/loading-service';
import { MessageService } from '../../commons/app-services/message-service';
import { TokenService } from '../../commons/app-services/token-service';
import { HttpService } from '../../commons/app-services/http-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName:string = '';
  password:string = '';

  langs = [];
  selectLang = GlobalVariable.LANGUAGES_DEFAULT;

  constructor(private authService:AuthService, private router: Router, private titleService: Title, private translate: TranslateService, private loading:LoadingService, private msg:MessageService, private token:TokenService, private http:HttpService) {
    this.setTitle();
    translate.onLangChange.subscribe(() => {
      this.setTitle();
    });
    this.langs = GlobalVariable.LANGUAGES;
  }

  langsChange(lang){
    this.translate.use(lang);
  }

  ngOnInit() {

  }

  setTitle(){
    this.translate.get('app.title').subscribe(res => {
      this.titleService.setTitle(res);
    });
  }

  login(){
    this.loading.loading = true;

    // 使用jwt，可以直接获取到用户信息，登录成功后直接跳转，否则，需要调用获取用户信息接口
    if(GlobalVariable.TOKEN_USE_JWT){
      this.authService.login(this.userName, this.password).subscribe(res => {
        this.http.handleResult(res, 
          data => {
          let token = data['access_token'];
          this.token.setToken(token);
          
          // 登录成功后跳转到原访问页面
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/main/index';
          this.router.navigate([redirect]);
        }, 
        msg => {
          this.msg.error(msg);
        });
      },
      err => {
        this.http.handleError(err);
      },
      () => {
        this.loading.loading = false;
      });
      
    }
    // 调用用户信息接口
    else{
      this.authService.login(this.userName, this.password)
        .map(res => res)
        .mergeMap(token => {
          this.token.setToken(token['access_token']);
          return this.authService.getUserInfo().map(userInfo => userInfo);
        }).subscribe(
          res => {
            this.token.setUserInfo(res);
            // 登录成功后跳转到原访问页面
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/main/index';
            this.router.navigate([redirect]);
          },
          err => {
            this.loading.loading = false;
          },
          () => {
            this.loading.loading = false;
          }
        );
    }

  }
}
