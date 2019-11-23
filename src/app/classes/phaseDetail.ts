export class PhaseDetail {
    phaseID: number;
    phaseName: string;
    budgetHr: number;
    actualHr: number;
    impact: string;


    constructor(
        phaseID: number,
        phaseName: string,
        budgetHr: number,
        actualHr:number,
        impact:string,
    ) {
        this.phaseID=phaseID;
        this.phaseName=phaseName;
        this.budgetHr=budgetHr;
        this.actualHr=actualHr;
        this.impact=impact;
    }
}