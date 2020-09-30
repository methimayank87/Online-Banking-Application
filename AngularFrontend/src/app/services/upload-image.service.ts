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
  postFile(caption: string, fileToUpload: File) {
    console.log('Hello')
    const formData: FormData = new FormData();
    formData.append('UserID' , '10000');
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);
    return this._http.post(this.baseUrl, formData);
  }
}
