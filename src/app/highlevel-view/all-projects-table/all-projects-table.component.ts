import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectListItem } from 'src/app/classes/projectListItem';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ProjectListService } from 'src/app/service/project-list.service';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';

/** The All project table component in High level view. */
@Component({
  selector: 'app-all-projects-table',
  templateUrl: './all-projects-table.component.html',
  styleUrls: ['./all-projects-table.component.css']
})

export class AllProjectsTableComponent implements OnInit {

  /** Each rows of project list table. */
  allProjects: ProjectListItem[];
  /** The temporay filter result of the project name search. */
  projectNamesSelectItem: SelectItem[];
  /** The column headers. */
  cols: any[];
  frozenCols: any[];
  /** The completion percentage filter. */
  yearFilter: number;
  /** The completion percentage input for searching. */
  yearTimeout: any;
  /** Summing all salary budget. */
  totalSalaryBuget:number;
  /** Summing all invoice amount. */
  totalInvoiced:number;
  /** The total salary minus invoiced amount. */
  balance:number;
  // hideQS:boolean;
  /** Indicator if the api calls returns. */
  isDataReady:boolean;

  @ViewChild('myTable',{static: false}) private _table: Table;
  name = 'Primeng data table date range filter';
  data: any;
  dateFilters: any;

  /** constructor before calling directive/component hook method */
  constructor(
    private route: ActivatedRoute,
    private projectListService: ProjectListService,
  ) { }

  /** Initialize the directive/component. */
  ngOnInit() {
    var _self = this;
    this.allProjects = [];
    this.isDataReady=false;
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

  /** GET all project api calls. */
  getAllProjects(): void {
    this.projectListService.getAllProjects()
      .subscribe(w => {
        this.allProjects = w;
        this.paraProjectNameToSelectItem();
        this.calculateTotal();
        this.isDataReady = true;
      });
  }

  /** Add project name into the project name selection dropdown menu. */
  paraProjectNameToSelectItem() {
    for (var i = 0; i < this.allProjects.length; i++) {
      this.projectNamesSelectItem.push({ label: this.allProjects[i].projectName, value: this.allProjects[i].projectName });

    }
  }

  /** Filter event when completion filter changed. */
  onYearChange(event, dt) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      dt.filter(event.value, 'completion', 'gt');
    }, 250);
  }

  /** Calcualte the totals of the table. */
  calculateTotal(){
    this.totalSalaryBuget = 0;
    this.totalInvoiced=0;
    for(var i = 0; i < this.allProjects.length; i++){
      this.totalSalaryBuget += this.allProjects[i].salaryBudget;
      this.totalInvoiced += this.allProjects[i].salaryInvoiced;
    }
    this.balance=this.totalSalaryBuget - this.totalInvoiced;

  }

  /** Calcualte the totals of the table when the filter event changed. */
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
