import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../../commons/base-page/base-page.component';
import { AppDataProvide } from '../../commons/app-dataprovide/app-dataprovide';
import { CpmCp } from './cpm-cp'; // 引入实体类
import { SearchInputOperatorGroup } from '../../commons/search-input/search-input-operator-group';
import { Customer } from './customer';

@Component({
  selector: 'app-cpm-cp', // 如果其它页面需要引用该页面，可以通过该标签引用
  templateUrl: './cpm-cp.component.html', // 对应的模板文件
  styleUrls: ['./cpm-cp.component.css'] // 对应的css文件
})
export class CpmCpComponent extends BasePageComponent {

  //searchUrl = '/api-b/cpmcp'; // 指定查询api地址
  searchUrl = '/resource/custom/customer/list'; // 指定查询api地址
  
  searchDetailUrl = '/resource/custom/customer/queryCustomerInfo'; // 指定查询明细url
  primaryKey = ['counterpartyCd'];
  hangyeUrl = '/api-b/helper/cpm/cpmcp'; // 指定帮助sql
  entityData = new Customer(); // 指定当前功能的实体，所有字段绑定到该实体，保存时自动把该实体传到服务器。
  operatorGroup = SearchInputOperatorGroup.NUMBER;

  registDtRequiredInd = '';
  show = true;
  status:Array<any> = AppDataProvide.activeStatus; // 定义下拉框数据

  afterContextInit(){
   if(this.mode == 'insert'){
    this.saveUrl = '/resource/custom/customer/insert'; // 指定保存api地址
   }else if(this.mode == 'update'){
    this.saveUrl = '/resource/custom/customer/update'; // 指定保存api地址
   }
  }

  afterShowDetails(res){
    this.entityData.hangyeObj = {
      'data':res['hangye'],
      'label':res['hangyenm']
    };
  }
  
  uploadedFiles:Array<any> = [];
  onUpload(event){

  }

  statusChange(value){
    this.log.info(value);
    if(value == 'IN'){
      this.show = true;
    }else{
      this.show = false;
    }
  }

  formatChineseAmount(amt){
    this.entityData['formatAmt'] = amt;
  }
}
