/**
 * This represent an invoice item in the low level page.
 */
export class InvoiceItem {

    /** the invoiced amount */
    amount: number;

    /** the invoiced date. */
    date: Date;

    /** constructor for adding invoice */
    constructor(
        amount: number,
        date: Date, ) {
        this.amount = amount;
        this.date = date;
    };

}