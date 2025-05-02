import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelService {


  token : any;

    constructor(private http :HttpService) 
    {
      this.token = localStorage.getItem('Token');
      console.log(this.token);
     }
  
    createLabel(payload: any)
    {
      let httpOption = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        }),
      };
      return this.http.postApi('/createNewLabel',payload, httpOption.headers);
    }


     
  GetLabelByUserId()
  {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
       'Authorization': `Bearer ${this.token}`,
      }), 
    };
    return this.http.getApi('/getLabelByUserId',httpOption.headers);

  }
  

  deleteLabel(labelId: number) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }),
    };
    return this.http.deleteApi(`/deleteLabel/${labelId}`, httpOption.headers);
  }
  


  assignLabelByNoteId(payload: any)
  {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      }),
    };
    return this.http.postApi('/assignLabelByNoteId',payload, httpOption.headers);
  }


  // RemoveLabelFromNote(noteId: number)
  // {
  //   const httpOption = {
  //     headers: new HttpHeaders({
  //       'Content-type': 'application/json',
  //       'Authorization': `Bearer ${this.token}`
  //     }),
  //   };
  //   console.log("Header",httpOption);
  //   return this.http.deleteApi(`/removeLabelFromNote/${noteId}`,httpOption.headers);
  // }


  


}



