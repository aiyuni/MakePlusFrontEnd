export class InvoiceItem {
    amount: number;
    date: Date;

    constructor(
        amount: number,
        date: Date, ) {
        this.amount = amount;
        this.date = date;
    };

}