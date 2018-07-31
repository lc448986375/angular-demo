/*
 * 路由守卫，判断用户登陆是否可以进入路由
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-06 15:10:06 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-06-08 17:27:37
 */
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router, ActivatedRouteSnapshot, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth-service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService:AuthService, private router: Router){}

    // 如果校验失败，不会加载该模块
    // 在需要校验的模块添加 canLoad: [AuthGuard] 配置
    canLoad(route: Route): boolean {
        /*
        console.log('canLoad');
        console.log(this.authService.isLoggedIn);
        console.log(route);
        let path:string = route.path;
        */
        // 此处取不到完整的路径，故跳转到首页
        let path:string = "main/index";
        return this.checkLogin(path);
    }

    // 如果加载失败调转到登陆页面
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url:string = state.url;
        return this.checkLogin(url);
    }

    private checkLogin(url:string):boolean{
        if (this.authService.logined()) { return true; }

        // 保存当前url，登陆后自动跳转
        this.authService.redirectUrl = url;

        // 登陆页面
        this.router.navigate(['/login']);
        return false;
    }
}