export class ProposalListItem {
    projectID: number;
    projectName: string;
    leadName: String;
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