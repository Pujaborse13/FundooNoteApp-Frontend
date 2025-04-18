import { Component ,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit
{
    registration! :FormGroup 

    constructor(private fb :FormBuilder ,private router: Router) {}
  
    ngOnInit(): void {
    this.registration  = this.fb.group({
      firstName : ['',[Validators.required , Validators.minLength(3)]],
      lastName :['', [Validators.required, Validators.minLength(3)]],
      date:   ['', Validators.required],
      gender: ['', Validators.required],
      email:  ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]},
     
      { validators: this.matchPasswords });

    }

    matchPasswords(control :AbstractControl) : ValidationErrors | null{
      const password = control.get('password')?.value;
      const confirm = control.get('confirmPassword')?.value;
      return password === confirm ? null:{ passwordMismatch: true };
    }

    get f() {
      return this.registration.controls;
    }

    onSubmit(): void {
      if(this.registration.valid)
      {
        const formData = this.registration.value;
        localStorage.setItem('user', JSON.stringify(formData));
        console.log('Form Data Stored in Local Storage:', formData);

        //redirect to login page
        console.log('Form Data:', this.registration.value);
        this.router.navigate(['login']);
      }
      else{
        this.registration.markAllAsTouched();
      }
     
    }


  }

  