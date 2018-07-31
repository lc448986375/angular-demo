/*
 * 异步加载帮助框
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-05-30 09:54:32 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-07-31 16:12:33
 */
import { Component, Input, forwardRef, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from "@angular/forms";
import { HttpService } from "../app-services/http-service";


@Component({
    selector: 'app-autocomplete',
    templateUrl: "./app-autocomplete.component.html",
    styleUrls: ["./app-autocomplete.component.css"],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppAutocomplete),
        multi: true
    }]        
})
export class AppAutocomplete implements ControlValueAccessor {
    @Input() url:String;
    @Input() disabled:boolean = false;
    @Input() readonly:boolean = false;
    @Input() field:String = 'data';
    @Output() change = new EventEmitter();
    _style:Object = {'width':'100%'};
    
    private _value;

    results = [];
    
    onModelChange: Function = () => { };
    
    constructor(private http:HttpService){

    }

    search(event){        
        this.http.get(this.url, {
            data:{
                kw:event.query
            }
        }, res => {
            this.results = res;
        });
    }

    @Input()
    set value(val){
        this._value = val;
        this.onModelChange(this._value);
        this.change.emit(this._value);
    }
    get value(){
        return this._value;
    }

    @Input()
    set style(val){
        Object.assign(this._style, val);
    }
    get style(){
        return this._style;
    }

    // 赋值时调用
    writeValue(val: Object): void {
        this.value = val;
    }

    // 页面值改变时，调用该方法，传入新值实现回传
    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {

    }
}