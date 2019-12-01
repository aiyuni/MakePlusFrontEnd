import { Component, OnInit, Input } from '@angular/core';
import { InvoiceItem } from 'src/app/classes/invoiceItem';
import { Project } from 'src/app/classes/project';

/** The invoice component in LOW level view. */
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  /** current project. */
  @Input() project:Project;
  /** each row of invoice table. */
  @Input() invoices: InvoiceItem[];
  /** indicator if this page is read only or not. */
  @Input() readMode:boolean;

  /** table column headers. */
  displayedColumns: string[] = ['date', 'amount'];
  /** table column headers names apply sorting function. */
  cols: any[];
  /** the selected invoice, or the new invoice. */
  invo: InvoiceItem;
  /** indicator is the invo is new or not. */
  newInvo: boolean;
  /** the selected invoice from the table. */
  selectedInvo: InvoiceItem;
  /** indicator is the dialog should show or not. */
  displayDialog: boolean;
  /** the default invoice date to today. */
  today:Date;
  /** the default inovice amount. */
  totalInvoiced:number;

  constructor() { }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.cols = [
      { field: 'date', header: 'date' },
      { field: 'amount', header: 'amount' }
    ];
    this.today = new Date(Date.now());
    this.calculateTotal();
  }

  /** calcuating the total invoiced amount. */
  calculateTotal() {
    var total = 0;
    for (var i = 0; i < this.invoices.length; i++) {
      total += this.invoices[i].amount;
    }
    this.project.totalInvoice = total;
    return total;
  }

  /** saving the data in the dialog window. */
  save() {
    if (this.newInvo)
      this.invoices.push(this.invo);
    else
      this.invoices[this.invoices.indexOf(this.selectedInvo)] = this.invo;

    this.invo = null;
    this.displayDialog = false;
  }

  /** delete the selected invoice. */
  delete() {
    let index = this.invoices.indexOf(this.selectedInvo);
    this.invoices = this.invoices.filter((val, i) => i != index);
    this.invo = null;
    this.displayDialog = false;
    this.project.invoiceArr = this.invoices;
  }
  /** table event when user clicks the row of the table. */
  onRowSelect(event) {
    this.newInvo = false;
    this.invo = this.cloneCar(event.data);
    this.displayDialog = true;
  }
  /** deep copying all the property from selected row to invo. */
  cloneCar(c: InvoiceItem): any {
    let car = {};
    for (let prop in c) {
      car[prop] = c[prop];
    }
    return car;
  }
  /** an event fired as the row selected. */
  showDialogToAdd() {
    this.newInvo = true;
    this.invo = new InvoiceItem( 1, new Date());
    this.displayDialog = true;
  }
  /** summing all the total amount. */
  calcuateTotal(){
    this.totalInvoiced = 0;
    for(var i = 0; i < this.invoices.length; i++){
      console.log(this.totalInvoiced);
      this.totalInvoiced += parseFloat(this.invoices[i].amount.toString());
    }
    this.updateOverviewInvoicedTotal();
  }

  /** update the project total invoice field. */
  updateOverviewInvoicedTotal(){
    console.log(this.project.totalInvoice);
    this.project.totalInvoice = this.totalInvoiced;
  }

}
