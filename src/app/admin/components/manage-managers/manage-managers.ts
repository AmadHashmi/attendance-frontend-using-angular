import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { Admin } from '../../services/admin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Snackbar } from '../../../shared/snackbar-service/snackbar';

@Component({
  selector: 'app-manage-managers',
  imports: [SharedModule],
  templateUrl: './manage-managers.html',
  styleUrl: './manage-managers.scss',
})
export class ManageManagers implements OnInit {
  projects: any;
  managers: any;
  managerForm!: FormGroup;

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
    this.getAllManagers();
  }

  initForm() {
    this.managerForm = this.fb.group({
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

  getAllManagers() {
    this.adminService.getAllManagers().subscribe((res) => {
      this.managers = res;
      console.log('managers');
      console.log(this.managers);
      this.dataSource = new MatTableDataSource(this.managers);
    });
  }

  onSubmit() {
    const data = this.managerForm.value;
    data.userRole = 'MANAGER';

    this.adminService.addUser(data).subscribe(
      (res) => {
        this.snackBarService.success('Manager created successfully');
        this.resetForm();
      },
      (error) => {
        this.snackBarService.error(error.error);
      }
    );
  }
  resetForm() {
    this.managerForm.reset();
  }
  applyFilter(filter) {}

  editManager(manager) {}
  deleteManager(manager) {}
}
