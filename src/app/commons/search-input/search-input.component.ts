/*
 * 查询条件帮助框
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-05-25 13:27:27 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-07-31 15:28:27
 */
import { Component, Input, forwardRef } from '@angular/core';
import { SearchInputOperatorGroup } from './search-input-operator-group';
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from "@angular/forms";
import { SearchInputOperator } from './search-input-operator';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchInputComponent),
    multi: true
  }]
})
export class SearchInputComponent implements ControlValueAccessor {
  @Input()type:string;
  @Input()name:string;
  @Input()label:string;
  @Input()dataProvider:Array<any> = [];
  @Input()url:string;
  @Input()operatorGroup:Array<{label:string, value:string}> = null;
  @Input() disabled:Boolean = false;
  onModelChange: Function = () => { };
  showValue2:boolean = false;

  private _operator = '';
  private _value = '';
  private _value2 = '';

  TYPE_STRING:string = "string";
  TYPE_COMBO:string = "combo";
  TYPE_CODE:string = "code";
  TYPE_AMOUNT:string = "amount";
  TYPE_DATE:string = "date";
  TYPE_RATE:string = "rate";

  constructor() {
    
  }

  ngOnInit() {
    if(this.operatorGroup == null || this.operatorGroup.length == 0){
      if(this.type == this.TYPE_STRING){
        this.operatorGroup = SearchInputOperatorGroup.STRING;
      }else if(this.type == this.TYPE_COMBO){
        this.operatorGroup = SearchInputOperatorGroup.COMBO;
      }else if(this.type == this.TYPE_CODE){
        this.operatorGroup = SearchInputOperatorGroup.CODE;
      }else if(this.type == this.TYPE_AMOUNT){
        this.operatorGroup = SearchInputOperatorGroup.NUMBER;
      }else if(this.type == this.TYPE_RATE){
        this.operatorGroup = SearchInputOperatorGroup.NUMBER;
      }else if(this.type == this.TYPE_DATE){
        this.operatorGroup = SearchInputOperatorGroup.DATE;
      }
    }
  }

  set operator(op){
    this._operator = op;
    if(op == SearchInputOperator.BETWEEN_VALUE){
      this.showValue2 = true;
    }else{
      this.showValue2 = false;
    }
    this.valuesChanged();
  }
  get operator(){
    return this._operator;
  }
  set value(val){
    this._value = val;
    this.valuesChanged();
  }
  get value(){
    return this._value;
  }
  set value2(val2){
    this._value2 = val2;
    this.valuesChanged();
  }
  get value2(){
    return this._value2;
  }

  // 赋值时调用
  writeValue(val: Object): void {
    if(val){
      this.operator = val['operator'];
      this.value = val['value'];
      this.value2 = val['value2'];
    }else{
      this.operator = '';
      // 如果是下拉框，设置默认value为第一个选项。因为页面初始化不会触发ngmodel绑定第一个默认值
      if(this.dataProvider.length > 0){
        this.value = this.dataProvider[0]['value'];
      }else{
        this.value = '';
      }
      this.value2 = '';
    }
  }

  // 页面值改变时，调用该方法，传入新值实现回传
  registerOnChange(fn: any): void {
      this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  private valuesChanged(){
    if(this._operator != SearchInputOperator.BLANK_VALUE){
      this.onModelChange({
        name:this.name, 
        operator:this._operator, 
        value:this._value, 
        value2:this._value2,
        type:this.type
      });
    }else{
      this.onModelChange(null);
    }
  }
}
