/**
 * This class represents the single row in the proposal table in the HIGH level page.
 */
export class ProposalListItem {
    /** project(proposal) id */
    projectID: number;
    /** project(proposal) name */
    projectName: string;
    /** the lead of this project(proposal) */
    leadName: String;
    /** the salary estimated. */
    salaryBudget: number;

    constructor(
        projectID: number,
        projectName: string,
        leadName: String,
        salaryBudget: number,
    ) {
        this.projectID = projectID;
        this.projectName = projectName;
        this.leadName = leadName;
        this.salaryBudget = salaryBudget;
    }
}