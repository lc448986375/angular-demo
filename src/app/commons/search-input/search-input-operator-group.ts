/*
 * 查询条件操作符
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-08 17:06:31 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-06-08 17:07:03
 */
import { SearchInputOperator } from './search-input-operator';

export class SearchInputOperatorGroup{
    public static ALL:Array<{label:string, value:string}> = [
        SearchInputOperator.BLANK,
        SearchInputOperator.EQUAL,
        SearchInputOperator.NOT_EQUAL,
        SearchInputOperator.GREATER,
        SearchInputOperator.GREATER_EQUAL,
        SearchInputOperator.LESS,
        SearchInputOperator.LESS_EQUAL,
        SearchInputOperator.LIKE,
        SearchInputOperator.START_WITH,
        SearchInputOperator.END_WITH,
        SearchInputOperator.BETWEEN,
        SearchInputOperator.IS_NULL,
    ]

    public static CODE:Array<{label:string, value:string}> = [
        SearchInputOperator.BLANK,
        SearchInputOperator.EQUAL,
        SearchInputOperator.NOT_EQUAL,
        SearchInputOperator.START_WITH,
        SearchInputOperator.END_WITH,
    ]

    public static COMBO:Array<{label:string, value:string}> = [
        SearchInputOperator.BLANK,
        SearchInputOperator.EQUAL,
        SearchInputOperator.NOT_EQUAL
    ]

    public static STRING:Array<{label:string, value:string}> = [
        SearchInputOperator.BLANK,
        SearchInputOperator.EQUAL,
        SearchInputOperator.LIKE,
        SearchInputOperator.START_WITH,
        SearchInputOperator.END_WITH
    ]

    public static NUMBER:Array<{label:string, value:string}> = [
        SearchInputOperator.BLANK,
        SearchInputOperator.EQUAL,
        SearchInputOperator.NOT_EQUAL,
        SearchInputOperator.BETWEEN,
        SearchInputOperator.GREATER,
        SearchInputOperator.GREATER_EQUAL,
        SearchInputOperator.LESS,
        SearchInputOperator.LESS_EQUAL
    ]

    public static DATE:Array<{label:string, value:string}> = [
        SearchInputOperator.BLANK,
        SearchInputOperator.EQUAL,
        SearchInputOperator.NOT_EQUAL,
        SearchInputOperator.BETWEEN,
        SearchInputOperator.GREATER,
        SearchInputOperator.GREATER_EQUAL,
        SearchInputOperator.LESS,
        SearchInputOperator.LESS_EQUAL
    ]
}