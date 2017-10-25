import {cached} from "../common/decorators/cached";
import {makeArrayFromRange, makeArrayFromArray, getRandomInt} from "../common/utils";

export class DefaultTask {

    protected problems:string[];
    protected answers:string[];

    protected FV:number;
    protected PV:number;
    protected r:number;
    protected n:number;
    protected t:number;

    protected T:number;


    constructor(options){
        this.FV = options.FV;
        this.PV = options.PV;
        this.r  = options.r;
        this.n  = options.n;
        this.t  = options.t;
        this.T  = options.T;
        this.answers  = options.answers;
    }
    public getFormula(){
        throw new Error("Not Defined")
    }
    public getApproxFormula(){
        return '';
    }
}

export class T1 extends DefaultTask {

    @cached
    public static get PV_data(){
        return makeArrayFromRange("250000-500000",10000)
    }
    @cached
    public static get FV_data(){
        let arr =  makeArrayFromRange("30000-70000",10000);
        return this.PV_data.map(i=>i+arr[getRandomInt(0,arr.length-1)]);
    }
    public static createProblems(answers=false){
        return this.PV_data.map((p,i)=>new T1({
            PV      : p,
            FV      : this.FV_data[i],
            n       : getRandomInt(1,3),
            answers : answers
        }))
    }
    public constructor(options:{}){
        super(options);
    }

    public toString(){
        return `Որոշել պարզ տոկոսադրույքը, որի դեպքում ${this.PV} դրամ սկզբնական կապիտալը կկազմի ${this.FV} դրամ ${this.n} տարի հետո։`
    }
    public toStringWithAnswers(){
        return `${this.answers?`${this.getFormula()}| `:''}Որոշել պարզ տոկոսադրույքը, որի դեպքում ${this.PV} դրամ սկզբնական կապիտալը կկազմի ${this.FV} դրամ ${this.n} տարի հետո։`
    }

    public getFormula(){
        return ((this.FV - this.PV)/(this.n * this.PV)*100).toFixed(2)
    }
}

export class T2 extends DefaultTask {

    @cached
    public static get FV_data(){
        return makeArrayFromRange("400000-650000",10000)
    }
    @cached
    public static get t_data(){
        return makeArrayFromArray(this.FV_data,makeArrayFromRange("90-270",10))
    }
    @cached
    public static get r_data(){
        return makeArrayFromArray(this.FV_data,makeArrayFromRange("12-24",1))
    }

    @cached
    public static get T_data(){
        let arr =  [360,365];
        return this.FV_data.map(i=>arr[getRandomInt(0,arr.length-1)]);
    }
    public static createProblems(answers=false){
        return this.FV_data.map((p,i)=>new T2({
            FV      : p,
            r       : this.r_data[i],
            t       : this.t_data[i],
            T       : this.T_data[i],
            answers : answers
        }))
    }
    public constructor(options:{}){
        super(options);
    }

    public toString(){
        return `Վարկը տրամադրվում է ${this.r}% տարեկան տոկոսադրույքով, ${this.t} օր ժամկետով։ Հաշվել փոխատուի կողմից ստացված գումարի մեծությունը, եթե փոխառուն պարտավորվում է վերադարձնել ${this.FV} դրամ։ 1 տարին ընդունել ${this.T} օր`
    }
    public toStringWithAnswers(){
        return `${this.answers?`${this.getFormula()}|${this.getApproxFormula()}| `:''}Վարկը տրամադրվում է ${this.r}% տարեկան տոկոսադրույքով ${this.t} օր ժամկետով։ Հաշվել փոխառուի կողմից ստացված գումարի մեծությունը,եփե փոխառուն պարտավորվում է վերադարձնել ${this.FV} դրամ։ 1 տարին=${this.T} օր`
    }

    public getFormula(){
        return (this.FV/(1+((this.r/100)*this.t)/this.T)).toFixed(2)
    }
    public getApproxFormula(){
        return (this.FV/(1+ Number((((this.r/100)*this.t)/this.T).toFixed(2)))).toFixed(2)
    }
}

export class T3 extends DefaultTask {

    @cached
    public static get PV_data(){
        return makeArrayFromRange("50000-300000",10000)
    }
    @cached
    public static get n_data(){
        return makeArrayFromArray(this.PV_data,makeArrayFromRange("2.5-6.5",1))
    }
    @cached
    public static get r_data(){
        return makeArrayFromArray(this.PV_data,makeArrayFromRange("12-24",1))
    }

    public static createProblems(answers=false){
        return this.PV_data.map((p,i)=>new T3({
            PV      : p,
            r       : this.r_data[i],
            n       : this.n_data[i],
            answers : answers
        }))
    }
    public constructor(options:{}){
        super(options);
    }

    public toString(){
        return `Վարկառուի կողմից ստացված գումարը կազմում է ${this.PV} դրամ։ Որոշել վարկի մարման դրամական մուծման ենթակա գումարի մեծությունը, եթե տարեկան տոկոսադրույքը ${this.r}% է եւ վարկը տրամադրված է ${this.n} տարով՝ բարդ տոկոսով։`
    }
    public toStringWithAnswers(){
        return `${this.answers?`${this.getFormula()}|${this.getApproxFormula()}| `:''}Վարկառուի կողմից ստացված գումարը կազմում է ${this.PV} դրամ։ Որոշել վարկի մարման դրամական մուծման ենթակա գումարի մեծությունը, եթե տարեկան տոկոսադրույքը ${this.r}% է եւ վարկը տրամադրված է ${this.n} տարով՝ բարդ տոկոսով։`
    }

    public getFormula(){
        let full = Math.floor(this.n);
        let part = this.n - full;
        let percent = this.r/100;
        return (this.PV * Math.pow(1 + percent,full) * (1 + part * percent)).toFixed(2)
    }
    public getApproxFormula(){
        let full = Math.floor(this.n);
        let part = this.n - full;
        let percent = this.r/100;
        return (this.PV * Number(Math.pow(1 + percent,full).toFixed(2)) * Number((1 + part * percent).toFixed(2))).toFixed(2)
    }
}
