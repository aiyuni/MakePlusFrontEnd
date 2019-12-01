/**
 * This class represents Material spent on low level page.
 */
export class MaterialItem {
    /** unique phase id */
    phaseID: number;
    /** the phase name. */
    phaseName:string;
    /** the estimated money amount. */
    projectedBudget: number;
    /** the actual money amount. */
    actualBudget: number;
    /** the user input note of the material items of this phase. */
    impact: string;

    /** constructor for adding material item */
    constructor(
        phaseID: number,
        phaseName:string,
        budget:number,
        actual:number,
        impact:string
    ){
        this.phaseID=phaseID;
        this.phaseName=phaseName;
        this.actualBudget=actual;
        this.projectedBudget=budget;
        this.impact=impact;
    }
}
