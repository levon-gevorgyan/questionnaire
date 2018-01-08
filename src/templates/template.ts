export type DegreeType = "b"|"m";
export type TermType = "I"|"II";
export type CourseType = "I"|"II"|"III"|"IV"|"V";

export type TemplateOptions = {
    university?:string;
    year:number;
    term:TermType;
    faculty?:string;
    specialization?:string;
    course:CourseType;
    degree?:DegreeType;
    subject:string;
    chair_name?:string;
    teacher_name?:string;
    date:Date;
}

export class Template {

    private university:string;
    private year:number;
    private term:TermType;
    private faculty:string;
    private specialization:string;
    private course:CourseType;
    private degree:DegreeType;
    private subject:string;
    private chair_name:string;
    private date:Date;

    constructor(opt:TemplateOptions){
        this.university     = opt.university || `ԵՐԵՎԱՆԻ ՀՅՈՒՍԻՍԱՅԻՆ ՀԱՄԱԼՍԱՐԱՆ`;
        this.year           = opt.year;
        this.term           = opt.term;
        this.faculty        = opt.faculty || `ՏՆՏԵՍԱԳԻՏՈՒԹՅԱՆ, ԿԱՌԱՎԱՐՄԱՆ ԵՎ ԻՆՖՈՐՄԱՏԻԿԱՅԻ`;
        this.specialization = opt.specialization || `Տնտեսագիտություն եւ կառավարում`;
        this.course         = opt.course;
        this.degree         = opt.degree || "b";
        this.subject        = opt.subject;
        this.chair_name     = opt.chair_name || `Ա. Ճուղուրյան`;
        this.date           = opt.date;
    }

    public getTemplate(ticket:number,questions:string[]){
        return `
                ${this.university}
                    ${this.year}-${this.year+1} ուստարի ${this.term} կիսամյակ
                 
                        ՔՆՆԱԿԱՆ ՏՈՄՍ No ${ticket}
                
Ֆակուլտետ - ${this.faculty}
${this.specialization} ${this.course} կուրս՝ ${this.getDegreeString()}
Առարկա - ${this.subject}

${this.getQuestions(questions)}
Ամբիոնի վարիչ՝ _____________ ${this.chair_name}
Դասախոս՝ __________             ${this.getDateString()}   
        Կ.Տ.     
`
    }

    private getQuestions(questions){
        let str = "";
        questions.forEach(((h,j)=>{
            str += `${(j+1)}. ${h}\n`;
        }));
        return str;
    }

    private getDegreeString(){
        switch (this.degree){
            case "b" :  return "բակալավր";
            case "m" :  return "մագիստրատուրա";
        }
    }
    private getDateString(){
        let day     = String(this.date.getDate());
        if(day.length<2){
            day = "0" + day;
        }
        let month   = String(this.date.getMonth() + 1);
        if(month.length<2){
            month = "0" + month;
        }
        let year    = this.date.getFullYear();
        return `«${day}» ${month} ${year}թ.`
    }
}