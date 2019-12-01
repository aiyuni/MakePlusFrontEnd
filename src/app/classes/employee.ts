/**
 * This class represents the employee object returned by api request.
 */
export class Employee {

    /** employ unique number */
    empID: number;

    /** employee name */
    name: string;

    /** employee hourly salary */
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