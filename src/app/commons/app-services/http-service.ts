/*
 * 通用http服务组件。
 * request, get, post...
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-05-25 11:33:23 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-07-31 15:51:47
 */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from './message-service';
import { LoadingService } from './loading-service';
import { GlobalVariable } from '../config/global-variable';
import { LogService } from './log-service';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from './token-service';

@Injectable()
export class HttpService{
    constructor(private http:HttpClient, private msgService:MessageService, private loadingService:LoadingService, private log:LogService, private translate:TranslateService, private token:TokenService){ }

    /**
     * 返回Observable对象
     * @param url url地址
     * @param type get,post
     * @param data 数据
     * @param options 参数（header）
     */
    request(url:string, type:string = "GET", data:Object = {}, options:Object = {}):Observable<Object>{
        let useAuthHeader:boolean = true;
        if(options.hasOwnProperty("useAuthHeader")){
            useAuthHeader = options["useAuthHeader"];
        }
        // 判断url是否包含host
        if(!url.trim().toLowerCase().startsWith('http')){
            url = GlobalVariable.BASE_API_URL + url;
        }

        if(!options['headers']){
            options['headers'] = {};
        }
        if(useAuthHeader){
            Object.assign(options['headers'], {
                'Authorization' : 'Bearer ' + this.token.getToken() // 设置token
            });
        }
        Object.assign(options['headers'], {
            'locales':this.translate.currentLang // 设置语言
        });

        let observable:Observable<Object> = null;
        if(type.toUpperCase() == 'GET' || type.toUpperCase() == 'DELETE'){
            // 如果为get请求，data转为params
            if(data){
                if(!options['params']){
                    options['params'] = {};
                }
                Object.keys(data).forEach(key => {
                    if(!data[key]){
                        return;
                    }else if(typeof(data[key]) == 'object'){
                        options['params'][key] = encodeURIComponent(JSON.stringify(data[key]));
                    }else{
                        options['params'][key] = data[key];
                    }
                });
            }
            if(type.toUpperCase() == 'GET'){
                observable = this.http.get(url, options);
            }else if(type.toUpperCase() == 'DELETE'){
                observable = this.http.delete(url, options);
            }
        }else if(type.toUpperCase() == 'POST'){
            observable = this.http.post(url, data, options);
        }

        return observable;
    }

    /**
     * 
     * @param url url地址
     * @param config 配置参数{data:'请求数据', header:'请求头'}
     * @param success 成功回调函数
     * @param error 失败回调
     * @param compelete 请求完成回调
     */
    ajax(url, config, success?, error?, compelete?){
        this.loadingService.loading = true;
        // 请求类型, 默认 get
        let type = 'GET';
        if(config['type']){
            type = config['type'];
        }

        // 请求数据
        let data = config['data'];
        
        // 请求参数
        let options = {};
        if(config['header']){
            options['headers'] = config['header'];
        }
        if(config['params']){
            options['params'] = config['params'];
        }

        let observable:Observable<Object> = this.request(url, type, data, options);

        observable.subscribe(
            res => {
                this.log.log(res);
                this.handleResult(res, success, msg => {
                    this.msgService.error(msg);
                    if(error){
                        error(msg);
                    }
                });
                this.loadingService.loading = false;
            },
            err => {
                if(error){
                    error(err);
                }
                // 后台处理异常
                this.handleError(err);
            },
            () => {
                if(compelete){
                    compelete();
                }                
            }
        );
    }

    /**
     * get，调用request
     * @param url url地址
     * @param config 配置参数{data:'请求数据', header:'请求头'}
     * @param success 成功回调函数
     * @param error 失败回调
     * @param compelete 请求完成回调
     */
    get(url, config, success?, error?, compelete?){
        config['type'] = 'GET';
        this.ajax(url, config, success, error, compelete);
    }

    /**
     * POST，调用 request
     * @param url url地址
     * @param config 配置参数{data:'请求数据', header:'请求头'}
     * @param success 成功回调函数
     * @param error 失败回调
     * @param compelete 请求完成回调
     */
    post(url, config, success?, error?, compelete?){
        config['type'] = 'POST';
        this.ajax(url, config, success, error, compelete);
    }

    delete(url, config, success?, error?, compelete?){
        config['type'] = 'DELETE';
        this.ajax(url, config, success, error, compelete);
    }

    handleResult(result, success?, fail?){
        // 对返回数据格式化
        if(GlobalVariable.RESULT_JSON_USE_FORMAT){
            // 成功
            if(GlobalVariable.RESULT_JSON_CODE_SUCCESS == result[GlobalVariable.RESULT_JSON_CODE]){
                if(success){
                    success(result[GlobalVariable.RESULT_JSON_DATA]);
                }
            }
            // 失败
            else{
                fail(result[GlobalVariable.RESULT_JSON_MSG]);
            }
        }
        // 没有格式，直接返回
        else{
            success(result);
        }
    }

    handleError(err){
        let error:Object = this.getErrorMsg(err)
        this.msgService.error(error['msg'], error['title']);
        this.loadingService.loading = false;
    }

    private getErrorMsg(err):Object{
        let result:Object = {msg:'', title:'失败!'};
        if(err.status == 0){
            result['msg'] = "登录超时";
        }
        // 请求无效
        else if(err.status == 400){
            // 字段未通过bean校验
            if(err.error && err.error.errors){
                result['title'] = '输入有误 !';
                let msg:Array<string> = [];
                err.error.errors.forEach(e => {
                    msg.push(e.defaultMessage);
                });
                result['msg'] = msg.join(' !<br/>') + ' !';
            }
        }else if(err.status == 401){
            // token无效，登陆超时
            result['msg'] = "登录超时";
        }else if(err.status == 404){
            result['msg'] = '请求不存在[' + err.url + ']';
            return result; ;
        }else if(err.status == 500){
            result['title'] = err['error']['error'];
            result['msg'] = err['error']['message'];
        }

        return result;
    }
}