import{Employee}from './employee';
import{WorkloadItem} from './workloadItem';
import{PhaseDetail} from './phaseDetail';
import{PhaseItem}from './phaseItem';
import{InvoiceItem} from './invoiceItem';
import{MaterialItem} from './materialItem';
import { EmployeeSalary } from './employeeSalary';

export class Project{

    constructor(data: any) {
        Object.assign(this, data);
      }
    //project detail
    ID : number;
    Name:string;
    desc:string;
    salaryBudget:number;
    totalInvoice:number;
    materialBudget:number;
    spendToDate:number;
    startDate:Date;
    endDate:Date;
    completion:number;
    recoredStoredCompleted:number;
    businessCode:string;
    isProposal:boolean;
    costMultiplier:number;
    isUnderISO13485:boolean;

    //quality system
    progressSurveySent:boolean;
    progressSurveyRsult:boolean;
    followupSurveySent:boolean;
    followupSurveyResult:boolean;

    //team member
    lead:Employee[];
    member:Employee[];

    //phase
    phaseArr: PhaseItem[];

    //invoice
    invoiceArr: InvoiceItem[];

    //workload
    workloadArr:WorkloadItem[];

    //salary
    employeeSalaryList:EmployeeSalary[];

    //material
    material:MaterialItem[];

    
}