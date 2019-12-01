/**
 * This class represents the single row in the project table in the HIGH level page.
 */
export class ProjectListItem {
    /** unique project id */
    projectID: number;
    /** project name */
    projectName: string;
    /** project lead name */
    leadName: String;
    /** the start date of this project. */
    startDate: Date;
    /** the end date of this project. */
    endDate: Date;
    /** the percentage of project completion */
    completion: number;
    /** the total salary estimated */
    salaryBudget: number;
    /** the total invoiced amount. */
    salaryInvoiced: number;
    /** the percentage of records completed. */
    recoredStoredCompleted: number;
    /** indicator if this project is under iso. */
    underISO13485: boolean;
    /** the business code the this project belongs to */
    businessCode: string;
    /** quality system status */
    progressSurveySent: boolean;
    /** quality system status */
    progressSurveyRsult: boolean;
    /** quality system status */
    followupSurveySent: boolean;
    /** quality system status */
    followupSurveyResult: boolean;
    /** indicator of this is project of proposal */
    isProposal: boolean;

    /** constructor for adding a project to front-end*/
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