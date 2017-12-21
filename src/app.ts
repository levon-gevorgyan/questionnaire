import {cached} from "./common/decorators/cached";
import template from "./templates/finansner"
import config from "./config"

import * as fs from "fs";
import path = require('path');
import {getRandomInt} from "./common/utils";
import {T1, T2, T3} from "./problems/finansakan";
import {T21, T22, T23, T24} from "./problems/finansakan2";



export class App {
    @cached
    public static get app(){
        return new App();
    }

    @cached
    private get t1(){
        return T21.createProblems(true);
    }
    @cached
    private get t2(){
        return T22.createProblems(true);
    }
    @cached
    private get t3(){
        return T23.createProblems(true);
    }
    @cached
    private get t4(){
        return T24.createProblems(true);
    }
    @cached
    private get tasks(){
        return [
            this.t1,
            this.t2,
            this.t3,
            this.t4,
        ]
    }


    @cached
    public get questions(){
        return  fs.readFileSync(path.join(__dirname, config.file), {encoding: 'utf-8'}).split("\n")


    }

    public start(){
        console.info("Started",{
            questions : this.questions
        });
        let tickets = this.createQuestions(2,true,25);
        this.toFile(tickets.questions);
        //this.toCsvFile(tickets.answers)
    }

    public createQuestionsWithTasks(answers=true){
        let a=[],q = [];
        for(let i = 0;i<this.t1.length;i++){
            let ticket = [];
            ticket.push(this.questions[i%this.questions.length]);
            let task = this.tasks[getRandomInt(0,3)][i];
            a.push([
                task.getFormula(),
                task.getApproxFormula(),
            ]);
            ticket.push(`Խնդիր։ ${task.toString()}`);
            q.push(ticket)
        }
        return {
            questions : q,
            answers   : a,
        };
    }

    public createQuestions(count:number,random = false,limit = 0){
        let q = this.questions.slice();
        if(q.length<count){
            throw new Error("Questions are not enough")
        }
        let tickets = this.questions.map((q,index)=>index);
        let possibilities = this.questions.map((q,index)=>[index]);
        for(let i = 0;i<count;i++){
            if(i+1 <count){
                let arr = [];
                possibilities.forEach(p=>{
                    tickets.forEach(j=>{
                        if(p.indexOf(j)<0){
                            arr.push(p.concat(j));
                        }
                    })
                });
                possibilities = arr
            }
        }
        let questions = [];
        let strings = [];
        possibilities.forEach(p=>{
            p.sort();
            let str =  JSON.stringify(p);
            if(strings.indexOf(str)<0){
                questions.push(p);
                strings.push(str)
            }
        });
        questions = questions.map(t=>{
            return t.map(q=>{
                return this.questions[q]
            })
        });
        if(random){
            let arr = [], copy = [].concat(questions);
            while (copy.length){
                let index = getRandomInt(0,copy.length - 1);
                arr.push(copy[index]);
                copy.splice(index,1)
            }
            questions = arr;
        }
        if(limit){
            questions = questions.splice(0,limit);
        }
        return {questions};
    }

    public toString(questions,random = true){
        if(random){
            let tmp = [].concat(questions);
            questions = [];
            while (tmp.length>0){
                let index = getRandomInt(0,tmp.length - 1);
                questions.push(tmp.splice(index,1)[0]);
            }
        }
        let str = template.header;
        questions.forEach((q,i)=>{
            str += "\n"+template.title + (i+1) + "\n\n";
            q.forEach(((h,j)=>{
                str += `${(j+1)}. ${h}\n`;
            }))
        });
        console.info(str);
        return str;
    }

    public toCsv(answers){
        let str = ",Answer,App.Answer\n";
        answers.forEach((a,i)=>{
            str = str += [i+1,a[0],a[1]].join(",") + '\n'
        });
        return str
    }

    public toFile(questions,random=false){
        return  fs.writeFileSync(path.join(__dirname, config.out), this.toString(questions,random),{encoding: 'utf-8'})
    }
    public toCsvFile(answers){
        return  fs.writeFileSync(path.join(__dirname, config.answers), this.toCsv(answers),{encoding: 'utf-8'})
    }
}

export default App.app;