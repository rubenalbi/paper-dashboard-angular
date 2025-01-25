import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMessage } from 'app/models/error-message';
import { Message } from 'app/models/message';
import { AuthService } from 'app/services/auth.service';
import { Logger } from 'app/shared/services/logger.service';
import { finalize } from 'rxjs';

const log = new Logger('Register');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: ErrorMessage | undefined;
  signupForm!: FormGroup;
  signedUp: Boolean = false;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  signup() {
    this.isLoading = true;
    const signup$ = this.authService.register(
      this.signupForm.value.username,
      this.signupForm.value.email,
      this.signupForm.value.password
    );
    signup$
      .pipe(
        finalize(() => {
          this.signupForm.markAsPristine();
          this.isLoading = false;
        }),
       //untilDestroyed(this)
      )
      .subscribe(
        (resp) => {
          log.debug(resp.message);
          this.signedUp = true;
          this.signupForm.reset();
        },
        (error) => {
          log.debug(`Error sign up: ${error.error.message}`);
          this.error = error.error;
          this.signedUp = false;
        }
      );
  }

  private createForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

}
