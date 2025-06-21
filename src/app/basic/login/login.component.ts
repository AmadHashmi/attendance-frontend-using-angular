import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../basic-services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../../shared/snackbar-service/snackbar';
import { UserStorage } from '../basic-services/user-storage';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private snackBarService: Snackbar,

    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  submitForm() {
    this.authService.loginUser(this.loginForm.value).subscribe(
      (res) => {
        UserStorage.saveUser(res);
        console.log(res);
        if (UserStorage.isAdminLoggedIn()) {
          this.snackBarService.success('Logged in successfully');
          this.router.navigateByUrl('/admin/dashboard');
        }
      },
      (error) => {
        this.snackBarService.error(`Bad credentials`);
      }
    );
  }
}
