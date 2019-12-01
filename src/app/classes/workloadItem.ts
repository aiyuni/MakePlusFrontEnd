/**
 * This class represents the workload table in LOW-level page only.
 */
export class WorkloadItem {
    /** unique employee id */
    empID: number;
    /** employee name */
    empName: string;
    /** the next 1st month by today */
    month1: number;
    /** the next 2nd month by today */
    month2: number;
    /** the next 3rd month by today */
    month3: number;
    /** the next 4th month by today */
    month4: number;
    /** the next 5th month by today */
    month5: number;
    /** the next 6th month by today */
    month6: number;
    
    /** constructor for adding a row in the workload table*/
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