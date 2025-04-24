import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BASE_URL: string = 'https://localhost:44353';

  constructor(private http: HttpClient) {}

  getHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getApi(endpoint: string, headers: HttpHeaders = this.getHeader()) {
    return this.http.get(`${this.BASE_URL}${endpoint}`, { headers });
  }

  postApi(endpoint: string , payload:any , headers :HttpHeaders = new HttpHeaders())
  {
    return this.http.post(this.BASE_URL + endpoint, payload,{headers});
  }

  postCreateNoteApi(endpoint: string, payload: any) {
    const headers = this.getHeader();
    return this.http.post(`${this.BASE_URL}${endpoint}`, payload, { headers });
  }





  
}
