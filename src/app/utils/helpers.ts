import { Dias } from './dias.enum';


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
        quincena.push(Dias[addDay.getDay()]+"-" + addDayFormat);
    }
    return quincena;
}