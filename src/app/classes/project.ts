import{Employee}from './employee';
import{WorkloadItem} from './workloadItem';
import{PhaseDetail} from './phaseDetail';
import{PhaseItem}from './phaseItem';
import{InvoiceItem} from './invoiceItem';
import{MaterialItem} from './materialItem';
import { EmployeeSalary } from './employeeSalary';
/**
 * This class represents the single project in low level.
 */
export class Project{

    constructor(data: any) {
        Object.assign(this, data);
      }
    
      /** the project id. */
    id : number;
    /** the project name. */
    name:string;
    /** the project description */
    desc:string;
    /** The total salary budget of this project. 
     * This value is read-only.
     * This value is auto-calculated by summing the estimated salary and mateiral spends.*/
    salaryBudget:number;
    /** The total invoiced amount.
     * This value is read-only.
     * This value is auto-calcuated by summing each row of invoice table of this project.
     */
    totalInvoice:number;
    /** The total material estimated amount.
     * This value is read-only.
     * This value is auto-calcuated by summing each row of material table of this project.
     */
    materialBudget:number;
    /** The total spend of actual salary and actual material spends. */
    spendToDate:number;
    /** The start date of this project. */
    startDate:Date;
    /** The end date of this project. */
    endDate:Date;
    /** The percentage of project completion. */
    completion:number;
    /** The percentage of the recorded stored under iso format. */
    recoredStoredCompleted:number;
    /** The business code this project belongs to. */
    businessCode:string;
    /** Indicator that this is a project or a proposal. */
    isProposal:boolean;
    /** The multiplier for the salary calculation. */
    costMultiplier:number;
    /** Indicator that this project is under ISO or not. */
    isUnderISO13485:boolean;

    /** Indicator of the quality system status. */
    progressSurveySent:boolean;
    /** Indicator of the quality system status. */
    progressSurveyRsult:boolean;
    /** Indicator of the quality system status. */
    followupSurveySent:boolean;
    /** Indicator of the quality system status. */
    followupSurveyResult:boolean;

    /** 
     * Team Lead of this project.
     * Current design only has one employee as an lead now.
     */
    lead:Employee[];
    /** Team members of this project. */
    member:Employee[];

    /** The phases that this project has. */
    phaseArr: PhaseItem[];

    /** The invoices of this project. */
    invoiceArr: InvoiceItem[];

    /** The workload table of this project which showing the estimated hrs in the next 6 months for an employee. */
    workloadArr:WorkloadItem[];

    /** The salary tracking table of team members. */
    employeeSalaryList:EmployeeSalary[];

    /** The mateial table. */
    material:MaterialItem[];

    
}