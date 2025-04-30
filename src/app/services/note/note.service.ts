import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  token : any;
  constructor(private http :HttpService) 
  {
    this.token = localStorage.getItem('Token');
    console.log(this.token);

   }


  createNote(payload: any)
  {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      }),
    };
    return this.http.postApi('/createNote',payload, httpOption.headers);
  }

  
  getAllNotes()
  {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
       'Authorization': `Bearer ${this.token}`,
      }), 
    };
    return this.http.getApi('/getAllNotesById',httpOption.headers);

  }

  archiveNote(noteId: number) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }),
    };
    console.log("Header",httpOption);
    return this.http.putApi('/archiveNote',noteId, httpOption.headers);
  
  }



  trashNote(noteId : number)
  {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }),
    };
    console.log("Header",httpOption);
    return this.http.putApi('/trashNote',noteId, httpOption.headers);

  }

  deleteNote(noteId: number)
  {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }),
    };
    console.log("Header",httpOption);
    return this.http.deleteApi(`/deleteNote/${noteId}`,httpOption.headers);
  }

  
  addColor(noteId: number , color: string)
  {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }),
    };
    console.log("Header",httpOption);
   //return this.http.putApi(`/addColour?noteId=${noteId}&color=${color}`, {}, httpOption.headers);
   return this.http.putApi(`/addColour?noteId=${noteId}&color=${encodeURIComponent(color)}`, {}, httpOption.headers);


  }

  
  updateNote(noteId: number, payload: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
    return this.http.putApi(`/updateNote?noteId=${noteId}`, payload, httpOptions.headers);
  }
  


}



