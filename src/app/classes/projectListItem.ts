export class ProjectListItem {
    projectID: number;
    projectName: string;
    leadName: String;
    startDate: Date;
    endDate: Date;
    completion: number;
    salaryBudget: number;
    salaryInvoiced: number;
    recoredStoredCompleted: number;
    underISO13485: boolean;
    businessCode: string;
    progressSurveySent: boolean;
    progressSurveyRsult: boolean;
    followupSurveySent: boolean;
    followupSurveyResult: boolean;
    isProposal: boolean;

    constructor(
        projectID: number,
        projectName: string,
        leadName: String,
        startDate: Date,
        endDate: Date,
        completion: number,
        salaryBudget: number,
        salaryInvoiced: number,
        recoredStoredCompleted: number,
        underISO13485: boolean,
        businessCode: string,
        progressSurveySent: boolean,
        progressSurveyRsult: boolean,
        followupSurveySent: boolean,
        followupSurveyResult: boolean,
    ) {
        this.projectID = projectID;
        this.projectName = projectName;
        this.leadName = leadName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.completion = completion;
        this.salaryBudget = salaryBudget;
        this.salaryInvoiced = salaryInvoiced;
        this.recoredStoredCompleted = recoredStoredCompleted;
        this.underISO13485 = underISO13485;
        this.businessCode = businessCode;
        this.progressSurveySent = progressSurveySent;
        this.progressSurveyRsult = progressSurveyRsult;
        this.followupSurveySent = followupSurveySent;
        this.followupSurveyResult = followupSurveyResult;
    }
}