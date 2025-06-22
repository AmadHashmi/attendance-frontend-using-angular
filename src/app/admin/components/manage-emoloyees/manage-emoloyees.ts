import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from '../../services/admin';
import { Snackbar } from '../../../shared/snackbar-service/snackbar';
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-manage-emoloyees',
  imports: [SharedModule],
  templateUrl: './manage-emoloyees.html',
  styleUrl: './manage-emoloyees.scss',
})
export class ManageEmoloyees implements OnInit {
  projects: any;
  employees: any;
  employeeForm!: FormGroup;

  displayedColumns: string[] = ['name', 'email', 'project', 'actions'];

  dataSource: MatTableDataSource<any>;
  constructor(
    private adminService: Admin,
    private fb: FormBuilder,
    private snackBarService: Snackbar
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.getAllProjects();
    this.getAllEmployees();
  }

  initForm() {
    this.employeeForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      projectId: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  getAllProjects() {
    this.adminService.getProjects().subscribe((res) => {
      this.projects = res;
      console.log('projects');
      console.log(this.projects);
    });
  }

  getAllEmployees() {
    this.adminService.getAllEmployees().subscribe((res) => {
      this.employees = res;
      console.log('employees');
      console.log(this.employees);
      this.dataSource = new MatTableDataSource(this.employees);
    });
  }

  onSubmit() {
    const data = this.employeeForm.value;
    data.userRole = 'EMPLOYEE';

    this.adminService.addUser(data).subscribe(
      (res) => {
        this.snackBarService.success('Employee created successfully');
        this.resetForm();
        this.getAllEmployees();
      },
      (error) => {
        this.snackBarService.error(error.error);
      }
    );
  }
  resetForm() {
    this.employeeForm.reset();
  }
  applyFilter(filter) {}

  editEmployee(employee) {}
  deleteEmployee(employee) {}
}
