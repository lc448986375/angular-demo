/*
 * 下拉框
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-06 10:48:02 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-07-04 16:17:24
 */
import { Component, OnInit, Input, ViewChild, forwardRef, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from "@angular/forms";

@Component({
    selector: 'app-combobox',
    //template: "<p-dropdown [options]=\"dataProvider\" [(ngModel)]=\"value\" [style]=\"style\" [disabled]=\"disabled\"></p-dropdown>",
    templateUrl: "./app-combobox.component.html",
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppComboBox),
        multi: true
    }]        
})
export class AppComboBox implements ControlValueAccessor {
    @Input() name:string;
    @Input() disabled:boolean = false;
    @Input() dataProvider:Array<any> = [];
    _style:Object = {'width':'150px'};

    @Output() change = new EventEmitter();

    private _value;
    onModelChange: Function = () => { };

    ngOnInit(){
        
    }

    @Input()
    set value(val){
        this._value = val;
        this.change.emit(val);
        this.onModelChange(this._value);
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
        if(val){
            this.value = val;
        }
        // 如果没有值，默认赋值第一个
        else{
            if(this.dataProvider && this.dataProvider.length > 0){
                this.value = this.dataProvider[0]['value'];
            }
        }
    }

    // 页面值改变时，调用该方法，传入新值实现回传
    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {

    }
}