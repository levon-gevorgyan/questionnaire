export function cached(target:any,key:string){
    let desc = Object.getOwnPropertyDescriptor(target,key);
    if(desc && typeof(desc.get)=='function'){
        let initializer = desc.get;
        desc.get = function getter(){
            return Object.defineProperty(this,key,{
                configurable    : true,
                value           : initializer.apply(this,arguments)
            })[key];
        };
        return desc;
    }
}