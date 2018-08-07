/*
 * 基础布局
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-05-25 13:27:11 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-07-31 17:54:13
 */
import { OnInit, Component, ViewChild, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { GlobalVariable } from '../config/global-variable';
import { AuthService } from '../app-services/auth-service';
import { TokenService } from '../app-services/token-service';
 
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls:['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    sidebarActive:boolean = false;
    items: MenuItem[] = [];
    tabMenuItems:MenuItem[] = [];

    langs = [];
    selectedLang = GlobalVariable.LANGUAGES_DEFAULT;
    user = {};
    

    constructor(private translate: TranslateService, private auth:AuthService, private token:TokenService) {
        this.langs = GlobalVariable.LANGUAGES;
        this.selectedLang = translate.currentLang;
    } 

    logout(){
        this.auth.logout();
    }

    changeLang(lang) {
        this.translate.use(lang);
    }

    showMenu(){
        this.sidebarActive = !this.sidebarActive;
    }

    ngOnInit() { 
        this.user = this.token.getUserInfo();

        this.tabMenuItems = [
            {label: 'Stats', icon: 'fa-bar-chart'},
            {label: 'Calendar', icon: 'fa-calendar'},
            {label: 'Documentation', icon: 'fa-book'},
            {label: 'Support', icon: 'fa-support'},
            {label: 'Social', icon: 'fa-twitter'},
            {label: 'Social', icon: 'fa-twitter'},
            {label: 'Social', icon: 'fa-twitter'},
            {label: 'Social', icon: 'fa-twitter'},
            {label: 'Social', icon: 'fa-twitter'},
            {label: 'Social', icon: 'fa-twitter'},
            {label: 'Social', icon: 'fa-twitter'}
        ];
        this.items = [
            {
                label:'首页',
                icon:'fa-home',
                routerLink:'index',
                title:'首页'
            },{
                label:'客户管理',
                icon:'fa-user',
                items:[
                    {
                        label:'客户管理-新增',
                        routerLink:['cpm/cpmcp/insert']
                    },{
                        label:'客户管理-修改',
                        routerLink:['cpm/cpmcp/update']
                    },{
                        label:'客户管理-复核',
                        routerLink:['cpm/cpmcp/check']
                    },{
                        label:'客户管理-查询',
                        routerLink:['cpm/cpmcp/inquire']
                    }
                ]
            },{
                label:'账户管理',
                icon:'fa-user',
                items:[
                    {
                        label:'账户管理-新增',
                        routerLink:['csh/account/insert']
                    },{
                        label:'账户管理-修改',
                        routerLink:['csh/account/update']
                    },{
                        label:'账户管理-复核',
                        routerLink:['csh/account/check']
                    },{
                        label:'账户管理-销户',
                        routerLink:['csh/account/close']
                    },{
                        label:'账户管理-查询',
                        routerLink:['csh/account/inquire']
                    }
                ]
            },{
              label: 'File',
              icon: 'fa-file-o',
              items: [{
                      label: 'New', 
                      icon: 'fa-plus',
                      items: [
                          {label: 'Project'},
                          {label: 'Other'},
                      ]
                  },
                  {label: 'Open'},
                  {label: 'Quit'}
              ]
          },
          {
              label: 'Edit',
              icon: 'fa-edit',
              items: [
                  {label: 'Undo', icon: 'fa-mail-forward'},
                  {label: 'Redo', icon: 'fa-mail-reply'}
              ]
          },
          {
              label: 'Help',
              icon: 'fa-question',
              items: [
                  {
                      label: 'Contents'
                  },
                  {
                      label: 'Search', 
                      icon: 'fa-search', 
                      items: [
                          {
                              label: 'Text', 
                              items: [
                                  {
                                      label: 'Workspace'
                                  }
                              ]
                          },
                          {
                              label: 'File'
                          }
                  ]}
              ]
          },
          {
              label: 'Actions',
              icon: 'fa-gear',
              items: [
                  {
                      label: 'Edit',
                      icon: 'fa-refresh',
                      items: [
                          {label: 'Save', icon: 'fa-save'},
                          {label: 'Update', icon: 'fa-save'},
                      ]
                  },
                  {
                      label: 'Other',
                      icon: 'fa-phone',
                      items: [
                          {label: 'Delete', icon: 'fa-minus'}
                      ]
                  }
              ]
          }
        
          ];

    }

    onMenuClick(event){

    }
}