import { Component, OnInit, Input } from '@angular/core';
import { WorkloadItem } from 'src/app/classes/workloadItem';

/** The workload component in LOW level view. */
@Component({
  selector: 'app-workload',
  templateUrl: './workload.component.html',
  styleUrls: ['./workload.component.css']
})
export class WorkloadComponent implements OnInit {

  /** each row in workload table. */
  @Input() workloadArr: WorkloadItem;
  /** indicator if this page is read only or not. */
  @Input() readMode:boolean;
  /** months that converts to actaul month and next 6 month */
  months:Date[];

  constructor() { }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.initMonths();
  }

  /** init next 6 months name based on current date */
  private initMonths(){
    let currentM = new Date().getMonth();
    let currentY = new Date().getFullYear();
    this.months = [
      new Date(currentY,currentM),
      new Date(currentY,currentM+1),
      new Date(currentY,currentM+2),
      new Date(currentY,currentM+3),
      new Date(currentY,currentM+4),
      new Date(currentY,currentM+5)
    ]
  }

}
