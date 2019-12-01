
import{PhaseDetail} from './phaseDetail';

/**
 * This class represents Employee Salary in the low level page.
 * This reperesnts a signle employee member in a project.
 */
export class EmployeeSalary {

    /** unique employee number. */
    empID: number;

    /** employee name. */
    empName: string;

    /** employee hourly salary */
    wage:number;

    /** an employee can have salary input for each phase. */
    phaseDetailsList:PhaseDetail[];     

    /** constructor when an employee is added from salary table. */
    constructor(
        
    ) {
        this.phaseDetailsList=[];
    }
}