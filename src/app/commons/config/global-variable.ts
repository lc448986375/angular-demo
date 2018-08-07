/*
 * 全局变量
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-12 14:56:46 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-07-31 14:24:59
 */
export const GlobalVariable = Object.freeze({
    BASE_API_URL: 'http://10.246.113.222:5555', // 接口地址
    //BASE_API_URL: 'http://localhost:8769', // 接口地址
    VERSION: '',             // 版本
    LOG_LEVEL: 'log',        // 日志级别
    // 支持的语言
    LANGUAGES:[
        {label:'中文', value:'zh-CN'},
        {label:'English', value:'en'}
    ],
    LANGUAGES_DEFAULT:"zh-CN",    // 默认语言
    API_LOGIN:"/uaa/oauth/token", // 登录
    //API_LOGIN:"/api-b/login", // 登录
    API_LOGOUT:"/uaa/oauth/logout", // 退出
    //API_LOGOUT:"/api-b/logout", // 退出
    TOKEN_USE_JWT:false, // token是否使用jwt
    TOKEN_API_HEADER_USE_FORM:true, // 获取token请求头content-type类型
    API_USER_INFO:"/uaa/user", // 如果不使用jwt，需要指定该api获取用户信息
    RESULT_JSON_USE_FORMAT:true, // api返回数据是否格式化
    RESULT_JSON_DATA:'data',
    RESULT_JSON_CODE:'code',
    RESULT_JSON_MSG:'msg',
    RESULT_JSON_CODE_SUCCESS:0,
    PAGE_RESULT_PAGE:'pageNum', // 当前页
    PAGE_RESULT_PAGE_SIZE:'pageSize', // 每页大小
    PAGE_RESULT_TOTAL:'total', // 总条数
    PAGE_RESULT_PAGES:'pages', // 总页数
    PAGE_RESULT_RECORDS:'list', // 数据集
    PAGE_SEARCH_PAGE:'pn', // 查询当前页码
    PAGE_SEARCH_PAGE_USE_PARAMS:true, // 在url中传递page参数
    PAGE_SEARCH_PAGE_SIZE:'pageSize',  // 查询每页大小
    PAGE_SEARCH_PAGE_SIZE_USER_PARAMS:true,
});