import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectListItem } from 'src/app/classes/projectListItem';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ProjectListService } from 'src/app/service/project-list.service';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';




@Component({
  selector: 'app-all-projects-table',
  templateUrl: './all-projects-table.component.html',
  styleUrls: ['./all-projects-table.component.css']
})
export class AllProjectsTableComponent implements OnInit {

  allProjects: ProjectListItem[];
  projectNamesSelectItem: SelectItem[];
  cols: any[];
  frozenCols: any[];
  yearFilter: number;
  yearTimeout: any;
  totalSalaryBuget:number;
  totalInvoiced:number;
  balance:number;
  hideQS:boolean;



  @ViewChild('myTable',{static: false}) private _table: Table;
  name = 'Primeng data table date range filter';
  data: any;
  dateFilters: any;


  constructor(
    private route: ActivatedRoute,
    private projectListService: ProjectListService,
  ) { }

  ngOnInit() {
    var _self = this;
    this.allProjects = [];
    this.projectNamesSelectItem = [];
    this.cols = [
      { field: 'projectName', header: 'Project Name' },
      { field: 'leadName', header: 'Project Lead' },
      { field: 'startDate', header: 'Start date' },
      { field: 'endDate', header: 'End date' },
      { field: 'completion', header: 'Completion' },
      { field: 'salaryBudget', header: 'Salary Budget' },
      { field: 'salaryInvoiced', header: 'Salary Invoiced' },
      { field: 'recoredStoredCompleted', header: 'Records' },
      { field: 'underISO13485', header: 'Under ISO 13485' },
      { field: 'businessCode', header: 'Business Codes' },
      { field: 'progressSurveySent', header: 'In progress survey sent' },
      { field: 'progressSurveyRsult', header: 'In progress survey result' },
      { field: 'followupSurveySent', header: 'Follow up survey sent' },
      { field: 'followupSurveyResult', header: 'Follow up survey result' },
    ];
    this.frozenCols = [
      { field: 'projectName', header: 'Project Name' },
      { field: 'leadName', header: 'Project Lead' }
  ];
    this.totalSalaryBuget = 0;
    this.totalInvoiced=0;
    this.balance=0;
    this.getAllProjects();

  }

  getAllProjects(): void {
    // this.projectListService.getAllProjects()
    //   .subscribe(w => {
    //     this.allProjects = w;
    //     console.log("get All projects api result: before");
    //     console.log(JSON.stringify(w));
    //     console.log("get All projects api result:");
    //     console.log(JSON.stringify(this.allProjects));
    //   });

    this.projectListService.getAllProjects()
      .subscribe(w => {
        this.allProjects = w;
        this.paraProjectNameToSelectItem();
        this.calculateTotal();
      });
  }

  paraProjectNameToSelectItem() {
    for (var i = 0; i < this.allProjects.length; i++) {
      this.projectNamesSelectItem.push({ label: this.allProjects[i].projectName, value: this.allProjects[i].projectName });

    }
  }

  onYearChange(event, dt) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      dt.filter(event.value, 'completion', 'gt');
    }, 250);
  }

  calculateTotal(){
    this.totalSalaryBuget = 0;
    this.totalInvoiced=0;
    for(var i = 0; i < this.allProjects.length; i++){
      this.totalSalaryBuget += this.allProjects[i].salaryBudget;
      this.totalInvoiced += this.allProjects[i].salaryInvoiced;
    }
    this.balance=this.totalSalaryBuget - this.totalInvoiced;

  }

  printFilteredItems(event: any) {
    this.totalSalaryBuget = 0;
    this.totalInvoiced=0;
    for(var i = 0; i < event.filteredValue.length; i++){
      this.totalSalaryBuget += event.filteredValue[i].salaryBudget;
      this.totalInvoiced += event.filteredValue[i].salaryInvoiced;
    }
    this.balance=this.totalSalaryBuget - this.totalInvoiced;
    console.log(event.filteredValue); // filtered users
    console.log(event.filters); // applied filters
  }


}
