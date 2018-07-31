/*
 * 日志输出
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-12 14:36:25 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-06-12 15:35:09
 */
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../config/global-variable';

@Injectable()
export class LogService{
    level:Number = 0;
    constructor(){
        let levelMap:Object = {
            'log':0,
            'info':1,
            'warn':2,
            'error':3,
            'no':4,
        };
        if(levelMap.hasOwnProperty(GlobalVariable.LOG_LEVEL)){
            this.level = levelMap[GlobalVariable.LOG_LEVEL];
        }
    }

    log(...args:any[]){
        if(this.level <= 0){
            console.log(args);
        }
    }

    info(...args:any[]){
        if(this.level <= 1){
            console.info(args);
        }
    }

    warn(...args:any[]){
        if(this.level <= 2){
            console.warn(args);
        }
    }

    error(...args:any[]){
        if(this.level <= 3){
            console.error(args);
        }
    }

}