/*
 * 金额输入框
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-05-25 09:29:08 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-07-04 17:37:35
 */
import { Component, OnInit, Output, Input, ViewChild, forwardRef, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from "@angular/forms";
import { MessageService } from "../app-services/message-service";
import { LogService } from "../app-services/log-service";


@Component({
    selector: 'app-amount-input',
    template: "<input type=\"text\" pInputText #amt (blur)=\"amtBlur($event)\" (focus)=\"amtFocus($event)\" [disabled]=\"disabled\" [readonly]=\"readonly\" />",
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppAmountInput),
        multi: true
    }]        
})
export class AppAmountInput implements ControlValueAccessor {
    @ViewChild('amt') amtInput;

    protected _amount:Number = 0;

    @Input() name:string;
    @Input() disabled:boolean = false;
    @Input() readonly:boolean = false;
    @Input() useThousandsSeparator:boolean = true;
    @Input() thousandsSeparator:String = ",";
    @Output() change = new EventEmitter();
    @Output() formatChinese = new EventEmitter();

    onModelChange: Function = () => { };

    ngOnInit(){
        
    }

    constructor(private msg:MessageService, private log:LogService){

    }

    // 赋值时调用
    writeValue(val: Object): void {
        this.amtInput.nativeElement.value = this.formatAmt(val);
    }

    // 页面值改变时，调用该方法，传入新值实现回传
    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {

    }

    amtBlur(e){
        this._amount = e.target.value;
        this.amtInput.nativeElement.value = this.formatAmt(this._amount);
        this.onModelChange(this._amount);
        this.change.emit(this._amount);
    }
    amtFocus(e){
        this.amtInput.nativeElement.value = this.formatNum(e.target.value);
    }

    private formatAmt(num:Object){
        if(!num){
            num = "0";
        }
        this.sendFormatChinese(num);
        if(!this.useThousandsSeparator){
            this.thousandsSeparator = '';
        }
        let numStr:String = parseFloat(num.toString()).toFixed(2);
        return numStr.split('').reverse().join('').replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, '$1' + this.thousandsSeparator).split('').reverse().join('');
    }
    private formatNum(amt:String){
        let reg = "/" + this.thousandsSeparator + "/g";
        return amt.replace(eval(reg), '');
    }

    private sendFormatChinese(money){
        let formater = this.changeMoneyToChinese(money);
        this.formatChinese.emit(formater);
        this.log.info(formater);
    }
    private changeMoneyToChinese(money){
        let cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
        let cnIntRadice = new Array("", "拾", "佰", "仟"); // 基本单位
        let cnIntUnits = new Array("", "万", "亿", "兆"); // 对应整数部分扩展单位
        let cnDecUnits = new Array("角", "分", "毫", "厘"); // 对应小数部分单位
        let cnInteger = "整"; // 整数金额时后面跟的字符
        let cnIntLast = "元"; // 整型完以后的单位
        let maxNum = 999999999999999.9999; // 最大处理的数字
        
        let IntegerNum; //金额整数部分
        let DecimalNum; //金额小数部分
        let ChineseStr = ""; //输出的中文金额字符串
        let parts; // 分离金额后用的数组，预定义
        if( money == "" ){
            return "";
        }
        money = parseFloat(money);
        // 超过最大金额
        if( money >= maxNum ){
            return "";
        }
        if( money == 0 ){
            ChineseStr = cnNums[0] + cnIntLast;
            return ChineseStr;
        }
        money = money.toString(); //转换为字符串
        if( money.indexOf(".") == -1 ){
            IntegerNum = money;
            DecimalNum = '';
        }else{
            parts = money.split(".");
            IntegerNum = parts[0];
            DecimalNum = parts[1].substr(0,4);
        }
        if( parseInt(IntegerNum,10) > 0 ){//获取整型部分转换
            let zeroCount = 0;
            let IntLen = IntegerNum.length;
            for(let i = 0; i < IntLen; i++ ){
                let n = IntegerNum.substr(i, 1);
                let p = IntLen - i - 1;
                let q = p / 4;
                let m = p % 4;
                if( n == "0" ){
                    zeroCount++;
                }else{
                    if( zeroCount > 0 ){
                        ChineseStr += cnNums[0];
                    }
                    zeroCount = 0; //归零
                    ChineseStr += cnNums[parseInt(n)]+cnIntRadice[m];
                }
                if( m==0 && zeroCount<4 ){
                    ChineseStr += cnIntUnits[q];
                }
            }
            ChineseStr += cnIntLast;
            //整型部分处理完毕
        }
        if( DecimalNum != '' ){ //小数部分
            let decLen = DecimalNum.length;
            for( let i = 0; i < decLen; i++ ){
                let n = DecimalNum.substr(i, 1);
                if( n != '0' ){
                    ChineseStr += cnNums[Number(n)]+cnDecUnits[i];
                }
            }
        }
        if( ChineseStr == '' ){
            ChineseStr += cnNums[0] + cnIntLast;
        }else if( DecimalNum == '' ){
            ChineseStr += cnInteger;
        }
        return ChineseStr;
    }
}