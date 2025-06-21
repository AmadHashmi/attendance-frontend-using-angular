import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from './shared/shared-module';
import { MatSidenav } from '@angular/material/sidenav';
import { UserStorage } from './basic/basic-services/user-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [SharedModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'AttendanceFrontend';

  isEmployeeLoggedIn: boolean = UserStorage.isEmployeeLoggedIn();
  isAdminLoggedIn: boolean = UserStorage.isAdminLoggedIn();
  isManagerLoggedIn: boolean = UserStorage.isManagerLoggedIn();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((events) => {
      this.isEmployeeLoggedIn = UserStorage.isEmployeeLoggedIn();
      this.isAdminLoggedIn = UserStorage.isAdminLoggedIn();
      this.isManagerLoggedIn = UserStorage.isManagerLoggedIn();
    });
  }

  logout() {
    UserStorage.signOut();
    this.router.navigate(['/']);
  }

  // for sidenave manipulation
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;

  toggleSidenav() {
    this.sidenav.toggle();
    this.isExpanded = !this.isExpanded;
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
