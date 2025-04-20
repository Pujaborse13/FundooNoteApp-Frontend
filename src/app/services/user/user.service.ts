import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http :HttpService) { }

  getAllUsers()
  {
    return this.http.getApi("/getAllUsers");
  }


  register(payload : any)
  {
    return this.http.postApi('/registeruser', payload);
  }



  
}
