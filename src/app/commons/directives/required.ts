/*
 * 必填项指令
 * 放在 ui-inputgroup-main class 的标签上
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-04 13:53:28 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-06-04 14:49:59
 */
import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
    selector: '[appRequired]'
})
export class RequiredDirective {
    private _position:string = 'C';
    // private position = 'P'; // 标签之前
    // private position = 'C'; // 标签之后
    // private position = 'A'; // 输入框之后

    constructor(private el: ElementRef, private renderer: Renderer2) {
        
    }

    ngAfterViewInit() {
        this.setRequire();
    }

    get position(){
        return this._position;
    }
    @Input()
    set position(val:string){
        this._position = val;
    }

    private setRequire(){
        // 如果为空，不执行
        if(this._position == null || this._position.trim().length == 0){
            return;
        }


        let label = this.el.nativeElement.querySelector('.ui-inputgroup-label');
        let span = this.renderer.createElement('span');
        let text = this.renderer.createText('*');

        // label标签前
        if(this._position == 'P'){
            this.renderer.appendChild(span, text);
            this.renderer.addClass(span, "ui-inputgroup-main-required");
            this.renderer.insertBefore(this.el.nativeElement, span, label);

            this.renderer.removeClass(label, "ui-inputgroup-label")
            this.renderer.addClass(label, "ui-inputgroup-label-required-" + this._position);
        }

        // label标签后
        else if(this._position == 'C'){
            this.renderer.appendChild(span, text);
            this.renderer.addClass(span, "ui-inputgroup-main-required");
            
            this.renderer.appendChild(label, span);
        }

        // 输入框后
        else if(this._position == 'A'){
            this.renderer.appendChild(this.el.nativeElement, span);
        }


        /*
        this.renderer.setValue(this.el.nativeElement.querySelector('.ui-inputgroup-label'), '123');
        console.log(this.el.nativeElement.querySelector('.ui-inputgroup-label').innerHTML  = '123');
        */
    }
}