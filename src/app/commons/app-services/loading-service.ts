/*
 * http服务 loading 加载中 提示框
 * 设置 loading = true 显示
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-05-25 11:36:48 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-06-11 11:12:35
 */
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService{
    loading:boolean;
    constructor(){
        this.loading = false;
    }
}