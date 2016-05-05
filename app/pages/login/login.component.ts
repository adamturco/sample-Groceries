import {Component} from "angular2/core";
import {User} from "../../shared/user/user";
import {UserService} from "../../shared/user/user.service";
import {HTTP_PROVIDERS} from "angular2/http";
import {Router} from "angular2/router";

@Component({
  selector: "my-app",
  providers: [UserService, HTTP_PROVIDERS],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
})

export class LoginPage {
  user: User;
  isLoggingIn = true;

  
  constructor(private _router: Router, private _userService: UserService) {
    this.user = new User();
    this.user.email = "adam@hy.com";
    this.user.password = "booyah";
  }
  
  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }
  
login() {
  this._userService.login(this.user)
    .subscribe(
      () => this._router.navigate(["List"]),
      (error) => alert("Unfortunately we could not find your account.")
    );
}
  
  signUp() {
    this._userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
        () => alert("Unfortunately we were unable to create your account.")
      );
  }
  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}