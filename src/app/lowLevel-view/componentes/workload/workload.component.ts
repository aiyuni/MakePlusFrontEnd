import { Component, OnInit, Input } from '@angular/core';
import { WorkloadItem } from 'src/app/classes/workloadItem';

@Component({
  selector: 'app-workload',
  templateUrl: './workload.component.html',
  styleUrls: ['./workload.component.css']
})
export class WorkloadComponent implements OnInit {

  @Input() workloadArr: WorkloadItem;
  @Input() readMode:boolean;
  months:Date[];

  constructor() { }

  ngOnInit() {
    this.initMonths();
  }

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
