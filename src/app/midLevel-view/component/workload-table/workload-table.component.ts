import { Component, OnInit, Input } from '@angular/core';
import { WorkloadPageItem } from 'src/app/classes/workLoadPageItem';
import { ActivatedRoute } from '@angular/router';
import { WorkloadPageService } from 'src/app/service/workload-page.service';
import { EmployeeListService } from 'src/app/service/employee-list.service';
import { EmployeeSalary } from 'src/app/classes/employeeSalary';
import { Employee } from 'src/app/classes/employee';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-workload-table',
  templateUrl: './workload-table.component.html',
  styleUrls: ['./workload-table.component.css']
})
export class WorkloadTableComponent implements OnInit {

  workloadPageItems: WorkloadPageItem[];
  cols: any[];
  @Input() employeesSelectItems:SelectItem[];
  @Input() months:Date[];

  constructor(
    private route: ActivatedRoute,
    private workloadPageService: WorkloadPageService,
  ) { }

  ngOnInit() {
    this.workloadPageItems=[];
    this.employeesSelectItems=[];
    this.cols = [
      { field: 'projectName', header: 'Project Name' },
      { field: 'empName', header: 'Research Member' },
      { field: 'month1', header: 'month1' },
      { field: 'month2', header: 'month2' },
      { field: 'month3', header: 'month3' },
      { field: 'month4', header: 'month4' },
      { field: 'month5', header: 'month5' },
      { field: 'month6', header: 'month6' },
      { field: 'projectCompletion', header: 'Project Completion' },
      { field: 'projectEndDate', header: 'Projected End Date' }
    ];
    this.getWorkload();
  }

  getWorkload(): void {
    this.workloadPageService.getAllWorkloadItems()
      .subscribe(w => {
        this.workloadPageItems = w;
        console.log("all workload for all employees api get result:");
        console.log(JSON.stringify(this.workloadPageItems));
      });
  }

  

}
