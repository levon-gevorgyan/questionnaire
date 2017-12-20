import {cached} from "../common/decorators/cached";
import {makeArrayFromRange, makeArrayFromArray, getRandomInt} from "../common/utils";

export class DefaultTask2 {

    protected problems:string[];
    protected answers:string[];

    protected PVoa:number;
    protected PVad:number;
    protected FVoa:number;
    protected FVad:number;
    protected PMT:number;
    protected i:number;
    protected n:number;

    constructor(options){
        this.PVoa   = options.PVoa;
        this.PVad   = options.PVad;
        this.FVoa   = options.FVoa;
        this.FVad   = options.FVad;
        this.PMT    = options.PMT;
        this.i      = options.i;
        this.n      = options.n;
        this.answers  = options.answers;
    }
    public getFormula(){
        throw new Error("Not Defined")
    }
    public getApproxFormula(){
        return '';
    }
}

//FVoa
export class T21 extends DefaultTask2 {

    @cached
    public static get PMT_data(){
        return makeArrayFromRange("100000-1300000",50000)
    }
    public static createProblems(answers=false){
        return this.PMT_data.map((p)=>new T21({
            PMT     : p,
            i       : getRandomInt(1,12),
            n       : getRandomInt(2,25),
            answers : answers
        }))
    }
    public constructor(options:{}){
        super(options);
    }

    public toString(){
        return `Ինչքա՞ն գումար կհավաքվի ${this.n} տարի հետո, եթե ավանդ դնենք ${this.PMT} դրամ յուրաքանչյուր տարվա վերջում, որտեղ տարեկան տոկոսադրույքը ${this.i}% է։`
    }
    public toStringWithAnswers(){
        return `${this.answers?`${this.getFormula()}| `:''}${this.toString()}`
    }

    public getFormula(){
        let i = this.i/100;
        return (this.PMT * ((Math.pow((1+i),this.n)-1)/i)).toFixed(2)
    }
}

//FVad
export class T22 extends DefaultTask2 {

    @cached
    public static get PMT_data(){
        return makeArrayFromRange("100000-1300000",50000)
    }
    public static createProblems(answers=false){
        return this.PMT_data.map((p)=>new T22({
            PMT     : p,
            i       : getRandomInt(1,12),
            n       : getRandomInt(2,25),
            answers : answers
        }))
    }
    public constructor(options:{}){
        super(options);
    }

    public toString(){
        return `Ինչքա՞ն գումար կհավաքվի ${this.n} տարի հետո, եթե ավանդ դնենք ${this.PMT} դրամ յուրաքանչյուր տարվա սկզբում, որտեղ տարեկան տոկոսադրույքը ${this.i}% է։`
    }
    public toStringWithAnswers(){
        return `${this.answers?`${this.getFormula()}| `:''}${this.toString()}`
    }

    public getFormula(){
        let i = this.i/100;
        return ((this.PMT * ((Math.pow((1+i),this.n)-1)/i))*(1+i)).toFixed(2)
    }
}

//PVoa
export class T23 extends DefaultTask2 {

    @cached
    public static get PMT_data(){
        return makeArrayFromRange("100000-1300000",50000)
    }
    public static createProblems(answers=false){
        return this.PMT_data.map((p)=>new T23({
            PMT     : p,
            i       : getRandomInt(1,12),
            n       : getRandomInt(2,25),
            answers : answers
        }))
    }
    public constructor(options:{}){
        super(options);
    }

    public toString(){
        return `Ինչքա՞ն գումար պետք է ներդնել այսօր ${this.i}%-ով, որպեսզի հնարավոր լինի առաջիկա ${this.n} տարիների ընթացքում կանխիկացնել ${this.PMT} դրամ յուրաքանչյուր տարվա վերջում։`
    }
    public toStringWithAnswers(){
        return `${this.answers?`${this.getFormula()}| `:''}${this.toString()}`
    }

    public getFormula(){
        let i = this.i/100;
        return (this.PMT * ((1-(1/Math.pow((1+i),this.n)))/i)).toFixed(2)
    }
}
//PVoa
export class T24 extends DefaultTask2 {

    @cached
    public static get PMT_data(){
        return makeArrayFromRange("100000-1300000",50000)
    }
    public static createProblems(answers=false){
        return this.PMT_data.map((p)=>new T24({
            PMT     : p,
            i       : getRandomInt(1,12),
            n       : getRandomInt(2,25),
            answers : answers
        }))
    }
    public constructor(options:{}){
        super(options);
    }

    public toString(){
        return `Ինչքա՞ն գումար պետք է ներդնել այսօր ${this.i}%-ով, որպեսզի հնարավոր լինի առաջիկա ${this.n} տարիների ընթացքում կանխիկացնել ${this.PMT} դրամ յուրաքանչյուր տարվա սկզբում։`
    }
    public toStringWithAnswers(){
        return `${this.answers?`${this.getFormula()}| `:''}${this.toString()}`
    }

    public getFormula(){
        let i = this.i/100;
        return (this.PMT * ((1-(1/Math.pow((1+i),this.n)))/i)*(1+i)).toFixed(2)
    }
}
