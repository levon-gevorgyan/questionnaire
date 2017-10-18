import {cached} from "./common/decorators/cached";
import template from "./templates/bankayin"
import config from "./config"

import * as fs from "fs";
import path = require('path');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class App {
    @cached
    public static get app(){
        return new App();
    }

    @cached
    public get questions(){
        return  fs.readFileSync(path.join(__dirname, config.file), {encoding: 'utf-8'}).split("\n")


    }

    public start(){
        console.info("Started",{
            questions : this.questions
        });
        this.toFile(this.createQuestions(2))
    }

    public createQuestions(count:number){
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
        return questions.map(t=>{
            return t.map(q=>{
                return this.questions[q]
            })
        })
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

    public toFile(questions,random=false){
        return  fs.writeFileSync(path.join(__dirname, config.out), this.toString(questions,random),{encoding: 'utf-8'})
    }
}

export default App.app;