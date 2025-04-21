import { Component ,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  login!: FormGroup;
  constructor(private fb :FormBuilder,
              private router: Router, 
              private user: UserService, 
              private snackBar:MatSnackBar ) {}

  
      ngOnInit(): void 
      {
        this.login  = this.fb.group({
          email:  ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
        
        });
      }

        get f() 
        {
          return this.login.controls;
        }

    onSubmit(): void 
    {
      if (this.login.invalid) {
        this.login.markAllAsTouched();
        this.snackBar.open('Login Failed! Please fill valid Email and Password.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        return;
      }
  
        //console.log('Form Data:', this.login.value);
        const payload ={
          email: this.login.value.email,
          password: this.login.value.password
        };

        // console.log('login payload :', payload);

          this.user.login(payload).subscribe({
            next:(result: any) =>
              {
                console.log('Login Success:', result);  

                localStorage.setItem('token', result.data);
                // const token = localStorage.getItem('token');
                //console.log('Token:',token);
                //this.router.navigateByUrl('dashboard/login')
  
                //Snackbar for pop msg
                this.snackBar.open("Login Successful!",'',{
                  duration: 3000,
                  panelClass: ['success-snackbar']
                });
             this.router.navigate(['/dashboard']);
            },

              error: (err: any) =>{
                console.error('Login Error:',err);

                  this.snackBar.open('Login Failed! Please fill all fields correctly.', 'Close', {
                  duration: 3000,
                  panelClass: ['error-snackbar']
    
                  });
                }
          });
              
  }
  goToRegister() 
  {
    this.router.navigate(['/register']);
  }

  
}