/*
 * 公共操作按钮、查询、保存等
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-05-25 13:26:08 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-05-25 13:27:01
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-base-page-toolbar',
  templateUrl: './base-page-toolbar.component.html',
  styleUrls: ['./base-page-toolbar.component.css']
})
export class BasePageToolbarComponent implements OnInit {

  @Output() onSearch = new EventEmitter();
  @Output() onSave = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  search(){
    this.onSearch.emit();
  }

  save(){
    this.onSave.emit('save');
  }

  submit(){
    this.onSave.emit('submit');
  }
}
