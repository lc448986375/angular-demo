/*
 * 主页面标签页面
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-08 17:04:01 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-06-08 17:04:46
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomReuseStrategy } from '../../app.custom-reuse-strategy'; 
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { combineLatest } from 'rxjs/observable/combineLatest'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-app-tab-menus',
  templateUrl: './app-tab-menus.component.html',
  styleUrls: ['./app-tab-menus.component.css'],
  providers:[ CustomReuseStrategy ]
})
export class AppTabMenusComponent implements OnInit {
  @ViewChild('tabs') tabs: ElementRef;
  showNext:boolean = false;
  showPre:boolean = false;

  //路由列表
  tabCollection: Array<{ title:string, module:string, active:boolean, url:string }> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title, private translate: TranslateService) {

    //路由事件
    /*
    this.router.events.filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      // 当route.data发出值时，通过route返回通知
      .mergeMap(route => route.data)
      .subscribe((event) => {
        // event为路由data内容
        //路由data的标题
        let title = event['title'];
        let module = event['module'];
        this.tabCollection.forEach(p => p.active = false);
        this.titleService.setTitle(title);
        let exitMenu = this.tabCollection.find(info=>info.module == module);
        if(exitMenu){//如果存在不添加，当前表示选中
          this.tabCollection.forEach(p => p.active = p.module == module);
        }else{
          var menu = { title: title, module: module, active:true };
          this.tabCollection.push(menu);
        }
      });
    */

    /*
    let data$ = this.router.events.filter(event => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map(route => {
      while (route.firstChild) route = route.firstChild;
      return route;
    })
    .filter(route => route.outlet === 'primary')
    // 当route.data发出值时，通过route返回通知
    .mergeMap(route => route.data);
    let url$ = this.router.events.filter(event => event instanceof NavigationEnd);

    combineLatest(data$, url$).subscribe(
      res => {
        console.log(res);
        let data = res[0];
        let urlInfo = res[1];
        let url = urlInfo['url'];

        // event为路由data内容
        //路由data的标题
        let title = data['title'];
        let module = data['module'];
        this.tabCollection.forEach(p => p.active = false);
        this.titleService.setTitle(title);
        let exitMenu = this.tabCollection.find(tab => tab.url == url);
        if(exitMenu){//如果存在不添加，当前表示选中
          console.log(url + 'exit');
          this.tabCollection.forEach(p => p.active = p.url == url);
        }else{
          console.log(url + 'not exit');
          var menu = { title: title, module: module, active:true, url:url };
          this.tabCollection.push(menu);
        }
      }
    ); 
    */

    
    let urlInfo = null;
    this.router.events.filter(event => event instanceof NavigationEnd)
      .map((event) => {urlInfo = event;return this.activatedRoute})
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      // 当route.data发出值时，通过route返回通知
      .mergeMap(route => route.data).subscribe(res => {
        // event为路由data内容
        //路由data的标题
        let url = urlInfo['url'];
        let title = res['title'];
        let module = res['module'];
        this.tabCollection.forEach(p => p.active = false);
        //this.titleService.setTitle(title);
        // 国际化
        translate.get(title).subscribe(res => {
          this.titleService.setTitle(res);
        });
        translate.onLangChange.subscribe(() => {
          this.tabCollection.forEach(p => {
            if(p.active){
              translate.get(p.title).subscribe(res => {
                this.titleService.setTitle(res);
              });
            }
          });
        });

        let exitMenu = this.tabCollection.find(tab => tab.url == url);
        if(exitMenu){//如果存在不添加，当前表示选中
          this.tabCollection.forEach(p => p.active = p.url == url);
        }else{
          var menu = { title: title, module: module, active:true, url:url };
          this.tabCollection.push(menu);
        }
        this.calculateShowMore();
      });
    
  }

  ngOnInit() {
    this.calculateShowMore();
  }

   //关闭选项标签
   closeTab(node){
    let url = node.url;
    let isSelect = node.active;

    //当前关闭的是第几个路由
    let index = this.tabCollection.findIndex(p => p.url == url);
    //如果只有一个不可以关闭
    if(this.tabCollection.length == 1){
      return;
    }

    this.tabCollection = this.tabCollection.filter(p=> p.url != url);

    // 删除复用
    //delete SimpleReuseStrategy.handlers[module];
    CustomReuseStrategy.deleteRouteSnapshot(url);

    this.calculateShowMore();
    if(!isSelect){
      return;
    }
    // 显示上一个选中
    let menu = this.tabCollection[index - 1];
    if(!menu) { // 如果上一个没有下一个选中
       menu = this.tabCollection[index + 1];
    }

    if(!menu){ // 下一个不存在,显示第一个
      menu = this.tabCollection[0];
    }

    if(menu){
      //this.tabCollection.forEach(p => p.active = p.url == menu.url);
      // 显示当前路由信息
      this.router.navigate([menu.url]);
    }else{
      alert('error');
    }
  }

  onTabClick(node){
    this.router.navigateByUrl(node.url);
  }

  next(){
    var prev = this.tabs.nativeElement;
    prev.scrollLeft = prev.scrollLeft - 200;
    if (prev.scrollLeft == 0) {
      this.showPre = false;
    }
    this.showNext = true;
  }
  pre(){
    var nxt = this.tabs.nativeElement;
    nxt.scrollLeft = nxt.scrollLeft + 200;
    if ((nxt.scrollWidth - nxt.offsetWidth - nxt.scrollLeft) <= 0) {
      this.showNext = false;
    }
    this.showPre = true;
  }
  calculateShowMore(){
    if (this.tabs.nativeElement.scrollWidth > this.tabs.nativeElement.clientWidth) {
      this.showNext = true;
    }else{
      this.showNext = false;
      this.showPre = false;
    }
  }
}
