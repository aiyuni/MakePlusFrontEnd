import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/classes/employee';
import { EmployeeListService } from 'src/app/service/employee-list.service';
import { ActivatedRoute } from '@angular/router';

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
  ) { }

  ngOnInit() {
    this.newEmployee = new Employee(0,"EmpoyeeName", 50);
  }

  submit(employee:Employee) {
    console.log("new employee created!");
    console.log(employee);
    this.employeeService.postEmployee(employee).subscribe(
      response=>console.log(response),
      err => console.log(err)
    );
  }
}
