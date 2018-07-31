/*
 * 查询条件操作符
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-08 17:07:06 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-06-26 16:05:50
 */
export class SearchInputOperator{
    public static BLANK_LABEL:string = "search.select";
    public static BLANK_VALUE:string = "";
    public static BLANK = {
        label:SearchInputOperator.BLANK_LABEL,
        value:SearchInputOperator.BLANK_VALUE
    }

    public static EQUAL_LABEL:string = "search.equal";
    public static EQUAL_VALUE:string = "=";
    public static EQUAL = {
        label:SearchInputOperator.EQUAL_LABEL, 
        value:SearchInputOperator.EQUAL_VALUE
    }

    public static NOT_EQUAL_LABEL:string = "search.not-equal";
    public static NOT_EQUAL_VALUE:string = "<>";
    public static NOT_EQUAL = {
        label:SearchInputOperator.NOT_EQUAL_LABEL,
        value:SearchInputOperator.NOT_EQUAL_VALUE
    }

    public static GREATER_LABEL:string = "search.greater";
    public static GREATER_VALUE:string = ">";
    public static GREATER = {
        label:SearchInputOperator.GREATER_LABEL,
        value:SearchInputOperator.GREATER_VALUE
    }

    public static GREATER_EQUAL_LABEL:string = "search.greater-equal";
    public static GREATER_EQUAL_VALUE:string = ">=";
    public static GREATER_EQUAL = {
        label:SearchInputOperator.GREATER_EQUAL_LABEL,
        value:SearchInputOperator.GREATER_EQUAL_VALUE
    }

    public static LESS_LABEL:string = "search.less";
    public static LESS_VALUE:string = "<";
    public static LESS = {
        label:SearchInputOperator.LESS_LABEL,
        value:SearchInputOperator.LESS_VALUE
    }

    public static LESS_EQUAL_LABEL:string = "search.less-equal";
    public static LESS_EQUAL_VALUE:string = "<=";
    public static LESS_EQUAL = {
        label:SearchInputOperator.LESS_EQUAL_LABEL,
        value:SearchInputOperator.LESS_EQUAL_VALUE
    }

    public static LIKE_LABEL:string = "search.like";
    public static LIKE_VALUE:string = "LIKE";
    public static LIKE = {
        label:SearchInputOperator.LIKE_LABEL,
        value:SearchInputOperator.LIKE_VALUE
    }

    public static START_WITH_LABEL:string="search.start-with";
    public static START_WITH_VALUE:string="START_WITH";
    public static START_WITH = {
        label:SearchInputOperator.START_WITH_LABEL,
        value:SearchInputOperator.START_WITH_VALUE
    }

    public static END_WITH_LABEL:string="search.end-with";
    public static END_WITH_VALUE:string="END_WITH";
    public static END_WITH = {
        label:SearchInputOperator.END_WITH_LABEL,
        value:SearchInputOperator.END_WITH_VALUE
    }

    public static BETWEEN_LABEL:string = "search.between";
    public static BETWEEN_VALUE:string = "BETWEEN";
    public static BETWEEN = {
        label:SearchInputOperator.BETWEEN_LABEL,
        value:SearchInputOperator.BETWEEN_VALUE
    }

    public static IS_NULL_LABEL:string = "search.is-null";
    public static IS_NULL_VALUE:string = "IS_NULL";
    public static IS_NULL = {
        label:SearchInputOperator.IS_NULL_LABEL,
        value:SearchInputOperator.IS_NULL_VALUE
    }
}