/*
 * 父页面。所有页面继承该页面，包含公共的保存、查询等方法。
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-05-25 13:22:47 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-07-31 16:10:38
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { HttpService } from '../app-services/http-service';
import { MessageService } from '../app-services/message-service';
import { SearchBean } from '../search-input/search-bean';
import { LogService } from '../app-services/log-service';
import { TokenService } from '../app-services/token-service';

@Component({
  selector: 'app-base-page',
  template: '',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent implements OnInit {
  // 查询条件是否关闭
  searchFieldSetCollapsed:boolean = false;
  // 指定活动页签
  tabIndex:number = 0;

  public mode:string = ""; // 模式。从路由配置中带过来的
  public module:string = ""; // 从路由配置中带过来
  public urlParams:Object = {}; // url中参数
  

  // 查询参数
  public searchUrl:string = "";
  public searchCodition:Object = {}; // 查询条件
  public searchPageSize:number = 50; // 分页大小
  public searchPage:number = 0; // 当前页码
  public searchPages:number = 0; // 总页数
  public searchTotals:number = 0; // 总记录条数
  public searchNext:boolean = false; // 是否有下一页
  public searchRowsPerPageOptions:Array<number> = [50, 100, 200];// 修改分页大小
  public searchResult:Array<any> = []; // 查询结果

  private serachParams:SearchBean = new SearchBean(); // 过滤、分页、排序，查询条件
    

  // 查询明细参数
  // 查询明细url
  public searchDetailUrl:string = "";
  // 如果设置为string类型 primaryKey = 'counterparty_cd'，则 url 为 /api-b/cpmcp/detials/counterparty_cd_value
  // 如果为object类型 primaryKeyValue = {'counterparty_cd':'123','account_cd':'456'}，则url为/api-b/cpmcp/detials?counterparty_cd=123&account_cd=456
  // 如果为array类型 primaryKeyValue = ['counterparty_cd']，则url为/api-b/cpmcp/detials?counterparty_cd=counterparty_cd_value
  public primaryKey:any = null;
  public searchDetailData:any = null;

  // 保存参数
  public saveUrl:string = ""; // 保存url
  public entityData:object = {}; // 存储保存数据
  public saveType:string = "save"; // 保存类型。save:保存，submit 保存并提交

  constructor(protected http:HttpService, protected activatedRoute:ActivatedRoute, protected msgService:MessageService, protected log:LogService, protected tokenService:TokenService) { }

  ngOnInit() {
    let routerData = this.activatedRoute.data['value'];
    if(routerData){
      this.mode = routerData['mode'];
    }
    
    this.afterContextInit();
    /*
      // url 格式 cpm;mode=insert
      // this.activatedRoute.params.subscribe((params:Params) => {        
      // url 格式 cpm?mode=insert
      
      this.activatedRoute.queryParams.subscribe((params:Params) => {
      this.urlParams = params;
      if(params['mode']){
        this.mode = params['mode'];
      }
      if(params['module']){
        this.module = params['module'];
      }
      this.afterContextInit();
    });
    */
  }

  // mode 初始化完成
  afterContextInit(){

  }

  // 查询之前调用，可以重写，用来自定义查询参数
  beforeSearch(){
    
  }
  // 保存之前调用，可以重写，自定义保存数据
  beforeSave(){

  }

  search(event: LazyLoadEvent = null){
    // 延迟调用查询
    setTimeout(() => {  
      this.buildSearch(event);
      this.beforeSearch();
      this.http.post(this.searchUrl, {
        data:this.serachParams
      }, res => {
        this.searchFieldSetCollapsed = true;

        this.searchResult = res['records'];
        this.searchPage = res['page']; 
        this.searchPages = res['pages'];
        this.searchTotals = res['totals'];
      });
    }, 10);
  }

  beforShowDetails(rowData:Object){

  }
  showDetails(event){
    let url = this.searchDetailUrl;
    let config = {data:{}};
    let rowData = event.data;
    if(Object.prototype.toString.call(this.primaryKey) == "[object String]"){
      if(!url.endsWith('/')){
        url += '/';
      }
      url += rowData[String(this.primaryKey)];
    }else if(Object.prototype.toString.call(this.primaryKey) == "[object Array]"){
      let keyValues = {};
      this.primaryKey.forEach(value => {
        keyValues[value] = rowData[value];
      });
      Object.assign(config['data'], keyValues);
    }else if(Object.prototype.toString.call(this.primaryKey) == "[object Object]"){
      Object.assign(config['data'], this.primaryKey);
    }
    this.buildSearchDetailData(rowData);
    this.beforShowDetails(rowData);
    this.tabIndex = 1;
    this.http.get(url, config, res => {
      this.entityData = res;
      this.afterShowDetails(res);
    });    
  }
  afterShowDetails(res:Object){
    
  }

  save(event:string){
    this.beforeSave();
    this.http.post(this.saveUrl, {
      data:this.entityData
    }, () => {
      this.msgService.success('保存成功');
      this.afterSave();
    });
  }
  afterSave(){
    this.afterSaveClear()
  }
  afterSaveClear(){
    this.entityData = {};
  }

  // 必须调用该方法，否则再次双击时无法自动跳转到主页面
  tabViewChange(e){
    this.tabIndex = e.index;
  }

  // 必须调用该方法，否则再次查询时无法自动折叠查询条件
  searchCollapsedChange(e){
    this.searchFieldSetCollapsed = e;
  }

  // 构造查询明细主键
  private buildSearchDetailData(rowData:Object){
    this.searchDetailData = {};
    if(this.primaryKey instanceof Object){
      Object.assign(this.searchDetailData, this.primaryKey);
    }else if(this.primaryKey instanceof Array){
      let keyValues = {};
      this.primaryKey.forEach(k => {
        keyValues[k] = rowData[k];
      });
      Object.assign(this.searchDetailData, keyValues);
    }else{
      this.searchDetailData = rowData[this.primaryKey];
    } 
  }

  // 构造查询参数
  private buildSearch(filterOrder:object){
    let filetrs = null, 
        page = 1, 
        pageSize = this.searchPageSize,
        sort = '';
    // 不为空，则是由grid发起查询
    if(filterOrder != null){
      filetrs = filterOrder['filetrs'];
      page = filterOrder['first'];
      pageSize = filterOrder['rows'];
      sort = filterOrder['sort'];
    }
    /*
    this.serachParams = {
      condition:this.searchCodition,
      filters:filetrs,
      page:page,
      pageSize:pageSize,
      sort:sort
    };
    */
   this.serachParams.conditions = [];
    Object.keys(this.searchCodition).forEach(key => {
      if(this.searchCodition[key]){
        if(!this.searchCodition[key]['name']){
          this.searchCodition[key]['name'] = key;
        }
        this.serachParams.conditions.push(this.searchCodition[key]);
      }
    });
    
    this.serachParams.page = page;
    this.serachParams.pageSize = pageSize;
    this.serachParams.sort = sort;
  }
}
