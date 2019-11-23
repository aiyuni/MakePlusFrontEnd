export class MaterialItem {
    phaseID: number;
    phaseName:string;
    projectedBudget: number;     //budget
    actualBudget: number;     //actual
    impact: string;

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
