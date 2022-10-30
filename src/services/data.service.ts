import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from 'src/app/interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getToken() {
    return this.http.post('http://localhost:8081/auth',{
        "username": "sarah",
        "password": "connor"
    })
  }

  getMembers(token: string) {
    const httpHeaders = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.get('http://localhost:8081/api/members', { headers: httpHeaders});
  }

  saveMember(data: Client, token: string) {
    const httpHeaders = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.post('http://localhost:8081/api/members', data, { headers: httpHeaders});
  }
}
