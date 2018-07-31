/*
 * 消息提示框，非阻断式
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-05-25 11:37:54 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-06-12 11:11:22
 */
import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MessageService{
    msgs: Message[] = [];
    constructor(private translate: TranslateService){ }

    /**
     * 成功消息
     * @param msg 消息内容
     */
    success(msg:string, title:string = 'msg.success'){
        this.translate.get(title).subscribe(res => {
            this.msgs.push({severity:'success', summary:res, detail:msg});
        });
    }

    /**
     * 失败消息
     * @param msg 消息内容
     */
    error(msg:string, title:string = 'msg.error'){
        this.translate.get(title).subscribe(res => {
            this.msgs.push({severity:'error', summary:res, detail:msg});
        });
    }
    /**
     * 提示消息
     * @param msg 消息内容
     */
    info(msg:string, title:string = 'msg.info'){
        this.translate.get(title).subscribe(res => {
            this.msgs.push({severity:'info', summary:res, detail:msg});
        });
    }
    /**
     * 警告消息
     * @param msg 消息内容
     */
    warn(msg:string, title:string = 'msg.warn'){
        this.translate.get(title).subscribe(res => {
            this.msgs.push({severity:'warn', summary:res, detail:msg});
        });
    }
}