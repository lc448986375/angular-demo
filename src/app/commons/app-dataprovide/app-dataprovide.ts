export class AppDataProvide{
    public static status:Array<{label:string, value:string}> = [
        {label:'正常', value:'OU'},
        {label:'到期', value:'MA'}
    ]

    public static activeStatus:Array<{label:string, value:string}> = [
        {label:'激活', value:'AC'},
        {label:'非激活', value:'IN'}
    ]
}