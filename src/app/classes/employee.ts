export class Employee {
    empID: number;
    name: string;
    wage: number;

    constructor(
        empID: number,
        name: string,
        wage: number,
        
    ) {
        this.empID=empID;
        this.name=name;
        this.wage=wage;
    }
}