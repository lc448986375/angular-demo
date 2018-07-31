/*
 * 日期输入框
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-05-31 17:34:11 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-07-04 14:06:33
 */

import { Component, OnInit, Input, ViewChild, forwardRef, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from "@angular/forms";
import * as moment from 'moment';

@Component({
    selector: 'app-date-input',
    template: "<p-calendar [(ngModel)]=\"value\" dateFormat=\"yy-mm-dd\" [showIcon]=\"true\" [disabled]=\"disabled\"></p-calendar>",
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppDateInput),
        multi: true
    }]        
})
export class AppDateInput implements ControlValueAccessor {
    @Input() name:string;
    @Input() disabled:boolean = false;
    @Output() change = new EventEmitter();

    _value:string = "";
    onModelChange: Function = () => { };

    ngOnInit(){
        
    }

    set value(val){
        this._value = moment(val).format('YYYY-MM-DD');
        this.onModelChange(this._value);
        this.change.emit(this._value);
    }
    get value(){
        return this._value;
    }

    // 赋值时调用
    writeValue(val: Object): void {
        if(val){
            this.value = moment(val).format('YYYY-MM-DD');
        }else{
            this.value = moment(new Date()).format('YYYY-MM-DD');
        }
    }

    // 页面值改变时，调用该方法，传入新值实现回传
    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {

    }
}