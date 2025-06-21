import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Snackbar {
  private config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };
  constructor(private snackBar: MatSnackBar) {}

  success(message: string): void {
    this.snackBar.open(message, 'Close', {
      ...this.config,
      panelClass: ['success-snackbar'],
    });
  }

  error(message: string): void {
    this.snackBar.open(message, 'Close', {
      ...this.config,
      panelClass: ['error-snackbar'],
      duration: 5000,
    });
  }

  warning(message: string): void {
    this.snackBar.open(message, 'Close', {
      ...this.config,
      panelClass: ['warning-snackbar'],
    });
  }
}
