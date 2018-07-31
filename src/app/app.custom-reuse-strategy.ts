/*
 * 路由重用策略
 * 主页面标签页路由重用
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-08 17:09:35 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-06-08 17:27:16
 */
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {

    public static handlers: { [key: string]: DetachedRouteHandle } = {}
    private static waitDelete: string

    /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // 如果没有该判断将会报错
        // Cannot reattach ActivatedRouteSnapshot created from a different rout
        if (!route.routeConfig || route.routeConfig.loadChildren) {
            return false;
        }
        return true;
    }

    /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        if (CustomReuseStrategy.waitDelete && CustomReuseStrategy.waitDelete == CustomReuseStrategy.getRouteUrl(route)) {
            // 如果待删除是当前路由则不存储快照
            CustomReuseStrategy.waitDelete = null
            return;
        }
        CustomReuseStrategy.handlers[CustomReuseStrategy.getRouteUrl(route)] = handle;
    }


    /** 若 path 在缓存中有的都认为允许还原路由 */
    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!CustomReuseStrategy.handlers[CustomReuseStrategy.getRouteUrl(route)]
    }

    /** 从缓存中获取快照，若无则返回null */
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) {
            return null
        }
        if(route.routeConfig.loadChildren){
            return null;
        }
        return CustomReuseStrategy.handlers[CustomReuseStrategy.getRouteUrl(route)]
        //return CustomReuseStrategy.handlers[route.routeConfig.path];
    }


    /** 进入路由触发，判断是否同一路由 */
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig &&
            JSON.stringify(future.queryParams) == JSON.stringify(curr.queryParams);
    }
    public static getRouteUrl(route:any){
        let path = '';
        if(route instanceof ActivatedRouteSnapshot){
            path = route['_routerState'].url.replace(/\//g, '_');
        }else{
            path = route.replace(/\//g, '_');
        }
        return path;
    }
    public static deleteRouteSnapshot(name: string): void {
        name = this.getRouteUrl(name);
        if (CustomReuseStrategy.handlers[name]) {
            delete CustomReuseStrategy.handlers[name];
        } else {
            CustomReuseStrategy.waitDelete = name;
        }
    }
}