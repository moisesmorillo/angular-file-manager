import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  constructor(private readonly http: HttpClient) {}
  getFileTree(): Observable<any> {
    return this.http.get('/assets/data.json');
  }
}
