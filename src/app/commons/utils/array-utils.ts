export class ArrayUtils{
    public static labelByData(arr:Array<any>, data){
        arr.forEach(obj => {
            if(obj['data'] == data){
                return obj['label'];
            }
        });
    }
}