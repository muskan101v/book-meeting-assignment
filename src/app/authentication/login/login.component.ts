import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userDetails = this._service.userdetails;
  loading = false;
  submitted = false;
  loginForm: any;
  error: any;

  constructor(
    private formBuilder: FormBuilder,
    private _service: ServiceService,
    private _router: Router
  ) {
    if (this.userDetails?.token) {
      _router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.intalizeForm();
  }

  intalizeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm?.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const payload = {
      username: this.loginForm.value.username.trim(),
      password: this.loginForm.value.password.trim(),
    };
    this.loading = true;
    this._service.login(payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.error = '';
        this._router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error.message;
        this.loading = false;
      },
    });
  }
}
