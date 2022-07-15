import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://sheet.best/api/sheets/48bf6721-8f09-46b4-a9a0-ca8f598d6195';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // C.R.U.D - CREATE, READ, UPDATE, DELETE

  // Retorna a lista de usuarios READ
  getUsers():Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  // Salva usuario no banco CREATE
  postUser(user: User):Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user, this.httpOptions);
  }

  // Exclui o usuario do banco DELETE
  deleteUser(codigo: number):Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrl}/codigo/${codigo}`)
  }

  // Edita usuario UPDATE
  updateUser(codigo: string, user: User):Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/codigo/${codigo}`, user, this.httpOptions);
  }

  // Lista usuario unico
  getUser(codigo: string):Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/codigo/${codigo}`)
  }
}

