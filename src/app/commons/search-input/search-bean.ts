/*
 * 传入后台查询条件实体
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-08 17:06:13 
 * @Last Modified by:   chang.liu 
 * @Last Modified time: 2018-06-08 17:06:13 
 */
import { Condition } from "./condtion";

export class SearchBean{
    public conditions:Array<Condition> = [];
    public filters:Array<Condition> = [];
    public page:Number;
    public pageSize:Number;
    public sort:String;
}