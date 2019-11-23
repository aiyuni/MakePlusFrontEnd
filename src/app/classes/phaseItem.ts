export class PhaseItem {
    phaseID: number;
    name: string;
    startDate: Date;
    endDate: Date;
    isRecordDone: boolean; //recordDone
    predictedDurationInWeeks: number;//predicted
    actualDurationInWeeks: number; //actual
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
    }
}
