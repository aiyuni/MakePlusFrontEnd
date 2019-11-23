import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ProjectListService } from 'src/app/service/project-list.service';
import { ActivatedRoute } from '@angular/router';
import { ProposalListItem } from 'src/app/classes/proposalListItem';


@Component({
  selector: 'app-all-proposal-table',
  templateUrl: './all-proposal-table.component.html',
  styleUrls: ['./all-proposal-table.component.css']
})
export class AllProposalTableComponent implements OnInit {

  
  allProposals: ProposalListItem[];
  proposalNamesSelectItem: SelectItem[];
  cols: any[];

  total:number;

  name = 'Primeng data table date range filter';
  data: any;
  dateFilters: any;


  constructor(
    private route: ActivatedRoute,
    private projectListService: ProjectListService,
  ) { }

  ngOnInit() {
    var _self = this;
    console.log("all projects");
    this.allProposals = [];
    this.cols = [
      { field: 'projectName', header: 'Proposal Name' },
      { field: 'leadName', header: 'Project Lead' },
      { field: 'startDate', header: 'Start date' },
      { field: 'salaryBudget', header: 'Salary Budget' }
    ];
    this.total=0;

    this.getAllProposals();

  }

  getAllProposals(): void {
    this.projectListService.getAllProposals()
      .subscribe(w => {
        this.allProposals = w;
        console.log("get All proposals api result:");
        console.log(JSON.stringify(this.allProposals));
        this.calculateTotal();
      });
  }

  calculateTotal(){
    this.total = 0;
    for(var i = 0; i < this.allProposals.length; i++)
      this.total += this.allProposals[i].salaryBudget;
  }

  printFilteredItems(event: any) {
    this.total = 0;
    for(var i = 0; i < event.filteredValue.length; i++){
      this.total += event.filteredValue[i].salaryBudget;
    }
    console.log(event.filteredValue); // filtered users
    console.log(event.filters); // applied filters
  }

}
