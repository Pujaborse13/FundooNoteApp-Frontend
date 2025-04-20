import { Component ,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  login!: FormGroup;
  constructor(private fb :FormBuilder,private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  
  ngOnInit(): void {
    this.login  = this.fb.group({
      email:  ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
     
    });
  }

    get f() {
      return this.login.controls;
    }

    onSubmit(): void {
      if(this.login.valid)
      {
        console.log('Form Data:', this.login.value);
      }
      else{
        this.login.markAllAsTouched();
      }
      
    }
  }
