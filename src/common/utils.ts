export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function makeArrayFromRange(range_string:string,step:number){
    let start,end,array = [];
    let range = range_string.split("-").map(s=>Number(s));
    if((start=range[0])<(end=range[1])){
        while (start<=end){
            array.push(start);
            start+=step;
        }
    }
    return array;
}

export function makeArrayFromArray(array:number[],list:number[]){
    return array.map(i=>list[getRandomInt(0,list.length-1)])
}