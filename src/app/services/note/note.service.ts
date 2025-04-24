import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http :HttpService) { }


  createNote(payload: any)
  {
    return this.http.postCreateNoteApi('/createNote',payload);
  }


  



}
