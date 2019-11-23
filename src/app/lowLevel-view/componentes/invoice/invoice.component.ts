import { Component, OnInit, Input } from '@angular/core';
import { InvoiceItem } from 'src/app/classes/invoiceItem';
import { Project } from 'src/app/classes/project';
import { Column } from 'primeng/components/common/shared';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  @Input() project:Project;

  @Input() invoices: InvoiceItem[];
  @Input() readMode:boolean;

  displayedColumns: string[] = ['date', 'amount'];
  cols: any[];
  invo: InvoiceItem;
  newInvo: boolean;
  selectedInvo: InvoiceItem;
  displayDialog: boolean;
  today:Date;

  totalInvoiced:number;

  constructor() { }

  ngOnInit() {
    this.cols = [
      { field: 'date', header: 'date' },
      { field: 'amount', header: 'amount' }
    ];
    this.today = new Date(Date.now());
    this.calculateTotal();
  }

  calculateTotal() {
    var total = 0;
    for (var i = 0; i < this.invoices.length; i++) {
      total += this.invoices[i].amount;
    }
    this.project.totalInvoice = total;
    return total;
  }

  save() {
    if (this.newInvo)
      this.invoices.push(this.invo);
    else
      this.invoices[this.invoices.indexOf(this.selectedInvo)] = this.invo;

    this.invo = null;
    this.displayDialog = false;
  }
  delete() {
    let index = this.invoices.indexOf(this.selectedInvo);
    this.invoices = this.invoices.filter((val, i) => i != index);
    this.invo = null;
    this.displayDialog = false;
    this.project.invoiceArr = this.invoices;
  }
  onRowSelect(event) {
    this.newInvo = false;
    this.invo = this.cloneCar(event.data);
    this.displayDialog = true;
  }
  cloneCar(c: InvoiceItem): any {
    let car = {};
    for (let prop in c) {
      car[prop] = c[prop];
    }
    return car;
  }
  showDialogToAdd() {
    this.newInvo = true;
    this.invo = new InvoiceItem( 1, new Date());
    this.displayDialog = true;
  }
  calcuateTotal(){
    this.totalInvoiced = 0;
    for(var i = 0; i < this.invoices.length; i++){
      console.log(this.totalInvoiced);
      this.totalInvoiced += parseFloat(this.invoices[i].amount.toString());
    }
    this.updateOverviewInvoicedTotal();
  }

  updateOverviewInvoicedTotal(){
    console.log(this.project.totalInvoice);
    this.project.totalInvoice = this.totalInvoiced;
  }

}
