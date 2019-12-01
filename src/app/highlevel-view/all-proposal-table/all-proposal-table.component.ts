import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ProjectListService } from 'src/app/service/project-list.service';
import { ActivatedRoute } from '@angular/router';
import { ProposalListItem } from 'src/app/classes/proposalListItem';

/** The All proposal table component in High level view. */
@Component({
  selector: 'app-all-proposal-table',
  templateUrl: './all-proposal-table.component.html',
  styleUrls: ['./all-proposal-table.component.css']
})
export class AllProposalTableComponent implements OnInit {

  /** Each rows of proposal list table. */
  allProposals: ProposalListItem[];
  /** The temporay filter result of the proposal name search. */
  proposalNamesSelectItem: SelectItem[];
  /** The column headers. */
  cols: any[];
  /** Indicator if the api calls returns. */
  isDataReady:boolean;
  /** Summing all budget. */
  total:number;

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
    console.log("all projects");
    this.allProposals = [];
    this.isDataReady=false;
    this.cols = [
      { field: 'projectName', header: 'Proposal Name' },
      { field: 'leadName', header: 'Project Lead' },
      { field: 'startDate', header: 'Start date' },
      { field: 'salaryBudget', header: 'Salary Budget' }
    ];
    this.total=0;

    this.getAllProposals();

  }

  /** GET all proposals api calls. */
  getAllProposals(): void {
    this.projectListService.getAllProposals()
      .subscribe(w => {
        this.allProposals = w;
        console.log("get All proposals api result:");
        console.log(JSON.stringify(this.allProposals));
        this.calculateTotal();
        this.isDataReady=true;
      });
  }

  /** calculate total budget. */
  calculateTotal(){
    this.total = 0;
    for(var i = 0; i < this.allProposals.length; i++)
      this.total += this.allProposals[i].salaryBudget;
  }

  /** Calcualte the totals of the table when the filter event changed. */
  printFilteredItems(event: any) {
    this.total = 0;
    for(var i = 0; i < event.filteredValue.length; i++){
      this.total += event.filteredValue[i].salaryBudget;
    }
    console.log(event.filteredValue); // filtered users
    console.log(event.filters); // applied filters
  }

}
