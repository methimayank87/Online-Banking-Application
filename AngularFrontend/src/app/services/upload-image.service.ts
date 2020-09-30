import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  baseUrl:string = "https://localhost:44306/api/UploadImage";
  constructor(private _http: HttpClient) { }
  postFile(caption: string, fileToUpload: File, userid) {
    console.log('Hello')
    const formData: FormData = new FormData();
    formData.append('UserID',userid)
    formData.append('ImageCaption', caption);
    formData.append('ImageName', fileToUpload, fileToUpload.name);
    

    return this._http.post(this.baseUrl, formData,this.httpOptions);

  }
}
