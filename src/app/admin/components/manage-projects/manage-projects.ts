import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Admin } from '../../services/admin';
import { Snackbar } from '../../../shared/snackbar-service/snackbar';
interface Project {
  id: number;
  name: string;
  duration: number;
  startDate: Date;
}
@Component({
  selector: 'app-manage-projects',
  imports: [SharedModule],
  templateUrl: './manage-projects.html',
  styleUrl: './manage-projects.scss',
})
export class ManageProjects implements OnInit {
  projectForm!: FormGroup;

  // creating table
  projects: Project[] = [];
  displayedColumns: string[] = ['name', 'duration', 'startDate', 'actions'];
  dataSource: MatTableDataSource<Project>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private adminService: Admin,
    private snackBarService: Snackbar
  ) {
    this.projects = this.generateMockProjects();
    this.dataSource = new MatTableDataSource(this.projects);
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.projectForm = this.fb.group({
      name: [null, [Validators.required]],
      duration: [null, [Validators.required, Validators.min(1)]],
      startDate: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    // if (this.projectForm.valid) {
    //   const newProject: Project = {
    //     id: Math.random().toString(36).substring(2),
    //     ...this.projectForm.value,
    //   };

    //   this.projects = [newProject, ...this.projects];
    //   this.dataSource.data = this.projects;
    //   this.resetForm();
    // }

    this.adminService.addProject(this.projectForm.value).subscribe(
      (res) => {
        this.snackBarService.success('Project added successfully');
        this.resetForm();
      },
      (error) => {
        this.snackBarService.error('Error while adding project');
      }
    );
  }

  resetForm(): void {
    this.projectForm.reset();
    this.projectForm.markAsPristine();
    this.projectForm.markAsUntouched();
  }

  editProject(project: Project): void {
    this.projectForm.patchValue({
      name: project.name,
      duration: project.duration,
      startDate: project.startDate,
    });
  }

  deleteProject(project: Project): void {
    this.projects = this.projects.filter((p) => p.id !== project.id);
    this.dataSource.data = this.projects;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private generateMockProjects(): Project[] {
    return [
      {
        id: 1,
        name: 'Website Redesign',
        duration: 45,
        startDate: new Date('2023-06-01'),
      },
      {
        id: 2,
        name: 'Mobile App Development',
        duration: 90,
        startDate: new Date('2023-05-15'),
      },
      {
        id: 3,
        name: 'Marketing Campaign',
        duration: 30,
        startDate: new Date('2023-07-01'),
      },
    ];
  }
}
