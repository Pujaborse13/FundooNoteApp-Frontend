import { Component ,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit
{
  
  registration! :FormGroup 

    constructor(private fb :FormBuilder ,
                private router: Router , 
                private snackBar:MatSnackBar, 
                private user: UserService) {}
  
    ngOnInit(): void 
    {
      this.registration  = this.fb.group({
      firstName : ['',[Validators.required , Validators.minLength(3)]],
      lastName :['', [Validators.required, Validators.minLength(3)]],
      date:   ['', Validators.required],
      gender: ['', Validators.required],
      email:  ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]},
     
      { validators: this.matchPasswords });



      this.user.getAllUsers().subscribe(
        {
          next:(res) => console.log('Get Sucess:',res),
          error: (err) => console.error('GET error:', err)
        });

    }

    matchPasswords(control :AbstractControl) : ValidationErrors | null
    {
      const password = control.get('password')?.value;
      const confirm = control.get('confirmPassword')?.value;
      return password === confirm ? null:{ passwordMismatch: true };
    }


    get f() 
    {
      return this.registration.controls;
    }

    onSubmit(): void 
    {
      if(this.registration.valid)
      {
        console.log('Form Data before API:', this.registration.value);
        // store user data on localStorage
        const formData = this.registration.value;
        localStorage.setItem('user', JSON.stringify(formData));

        console.log('Form Data Stored in Local Storage:', formData);

          const payload={
            firstName: this.registration.value.firstName,
            lastName: this.registration.value.lastName,
            dob :this.registration.value.date,
            gender: this.registration.value.gender,
            email: this.registration.value.email,
            password: this.registration.value.password
          };
        

          if (!payload.password) {
            console.error('Password is missing!');
            return;
          }
          
          console.log('Registering with:', payload);

          this.user.register(payload).subscribe({
          next:(result: any) =>
            {
              console.log('Registration Success:', result);
                //console.log(result);

              //this.router.navigateByUrl('dashboard/login')

              //Snackbar for pop msg
              this.snackBar.open("Registration Successful!",'',{
                duration: 3000,
                panelClass: ['success-snackbar']
              });

              //redirect to login page
             // console.log('Form Data:', this.registration.value);
              this.router.navigate(['login']);
            },

            error: (err: any) =>{
            console.error(err);
              this.snackBar.open('Registration Failed! Please fill all fields correctly.', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']

              });
            }
      });
    }
      else
      {
          this.registration.markAllAsTouched();
          this.snackBar.open('Registration Failed! Please fill all fields correctly.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
               });
      }

  }

}