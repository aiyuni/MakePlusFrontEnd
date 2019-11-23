export class WorkloadItem {
    empID: number;
    empName: string;
    month1: number;
    month2: number;
    month3: number;
    month4: number;
    month5: number;
    month6: number;
    
    constructor(
        empID: number,
        empName: string,
        month1: number,
    month2: number,
    month3: number,
    month4: number,
    month5: number,
    month6: number
    ){
        this.empID=empID;
        this.empName=empName;
        this.month1 = month1;
        this.month2=month2;
        this.month3=month3
        this.month4=month4;
        this.month5=month5;
        this.month6=month6;
    }
}