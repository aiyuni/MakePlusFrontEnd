/**
 * This represents a single row of the employee salary table in low level page.
 */
export class PhaseDetail {
    /** unique phase id. */
    phaseID: number;
    /** phase name. */
    phaseName: string;
    /** the estimated employee hours of this phase. */
    budgetHr: number;
    /** the actual employee hours of this phase.  */
    actualHr: number;
    /** the notes of the salary impact. */
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