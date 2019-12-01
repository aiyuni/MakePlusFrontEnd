/**
 * This class represents the rows of the pahse.
 */
export class PhaseItem {
    /** Phase id */
    phaseID: number;
    /** Phase name. */
    name: string;
    /** The start date of this phase. */
    startDate: Date;
    /** the end date of this phase. */
    endDate: Date;
    /** The phase is recorded in iso format. */
    isRecordDone: boolean;
    /** the estimated phase duriation in weeks. */
    predictedDurationInWeeks: number;
    /** the actual phase duriation in weeks. */
    actualDurationInWeeks: number;
    /** the user notes of the impact on this phase. */
    impact: string;

    constructor(
        phaseID: number,
        name: string,
        startDate: Date,
        endDate: Date,
        predictedDurationInWeeks: number,
        actualDurationInWeeks: number,
        impact: string,
    ) {
        this.phaseID = phaseID;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.predictedDurationInWeeks = predictedDurationInWeeks;
        this.actualDurationInWeeks = actualDurationInWeeks;
    }
}
