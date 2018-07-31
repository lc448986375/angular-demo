/*
 * 利率输入框
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-11 10:01:52 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-06-12 16:03:35
 */
import { Component, OnInit, Input, ViewChild, forwardRef, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from "@angular/forms";


@Component({
    selector: 'app-rate-input',
    template: "<input type=\"text\" pInputText #rate (blur)=\"rateBlur($event)\" (focus)=\"rateFocus($event)\" [disabled]=\"disabled\" [readonly]=\"readonly\" />",
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppRateInput),
        multi: true
    }]        
})
export class AppRateInput implements ControlValueAccessor {
    @ViewChild('rate') rateInput;

    @Input() name:string;
    @Input() precision:number = 6;
    @Input() disabled:boolean = false;
    @Input() readonly:boolean = false;
    @Input() useThousandsSeparator:boolean = false;
    @Input() thousandsSeparator:String = ",";
    @Output() change = new EventEmitter();

    protected _rate:Number = 0;

    onModelChange: Function = () => { };

    ngOnInit(){
        
    }

    // 赋值时调用
    writeValue(val: Object): void {
        this.rateInput.nativeElement.value = this.formatAmt(val);
    }

    // 页面值改变时，调用该方法，传入新值实现回传
    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {

    }

    rateBlur(e){
        this._rate = e.target.value;
        this.rateInput.nativeElement.value = this.formatAmt(this._rate);
        this.onModelChange(this._rate);
        this.change.emit(this._rate);
    }
    rateFocus(e){
        this.rateInput.nativeElement.value = this.formatNum(e.target.value);
    }

    private formatAmt(num:Object){
        if(!num){
            num = "0";
        }
        if(!this.useThousandsSeparator){
            this.thousandsSeparator = '';
        }
        let numStr:String = parseFloat(num.toString()).toFixed(this.precision);
        return numStr.split('').reverse().join('').replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, '$1' + this.thousandsSeparator).split('').reverse().join('');
    }
    private formatNum(amt:String){
        let reg = "/" + this.thousandsSeparator + "/g";
        return amt.replace(eval(reg), '');
    }
}