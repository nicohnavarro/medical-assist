import { Days } from './days.enum';


export function getHorarios() {
    let horarios = ['8:00','9:00','10:00','11:00',
    '12:00','13:00','14:00','15:00','16:00','17:00',
    '18:00','19:00']; 
    return horarios;
} 

export function getDiaFormat(dia:Date){
    return `${dia.getDate()}/${dia.getMonth()+1}/${dia.getFullYear()}`;
}

export function getQuincena(){
    let hoy = new Date();
    let quincena:string[] = [];
    for(let i=1; i<=15; i++){
        let addDay= new Date();
        addDay.setDate(addDay.getDate() + i);
        if(addDay.getDay()=== 0){continue}
        let addDayFormat = getDiaFormat(addDay);
        quincena.push(Days[addDay.getDay()]+"-" + addDayFormat);
    }
    return quincena;
}

export function getDateWork(work_days:string[]){
    let date = new Date();
    let today = new Date();
    let quincena:string[] = [];
    for(let i=1 ; i<=15 ; i++){
        date.setDate(today.getDate() + i);
        if(work_days.includes(Days[date.getDay()])){
            quincena.push(Days[date.getDay()] + '-' + getDiaFormat(date));
        }
    }
    return quincena;
}   