import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/classes/employee';
import { EmployeeListService } from 'src/app/service/employee-list.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-system-admin',
  templateUrl: './system-admin.component.html',
  styleUrls: ['./system-admin.component.css']
})
export class SystemAdminComponent implements OnInit {

  newEmployee:Employee;
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeListService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.newEmployee = new Employee(0,"EmpoyeeName", 50);
    this.writeEmployID();
  }

  submit(employee:Employee) {
    console.log("new employee created!");
    console.log(employee);
    this.employeeService.postEmployee(employee).subscribe(
      response=>{
        console.log(response);
        this.openSnackBar(`New employee ${this.newEmployee.empID} ${this.newEmployee.name} saved.`,'',3000);
      },
      err => {
        console.log(err);
        this.openSnackBar(`Saving new employee ${this.newEmployee.empID} Error.`,'',3000);
      }
    );
  }
  writeEmployID(){
    this.employeeService.getTotalEmployeeID()
        .subscribe(p => {
          this.newEmployee.empID = p.id + 1;
          console.log("Post new project.");
          console.log(this.newEmployee);
        });
  }

  openSnackBar(message: string, action: string, duration:number) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }
}
