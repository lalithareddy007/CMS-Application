import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Program } from '../models/program';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  private apiUrl = "http://localhost:3000/programs";
  constructor(private httpClient: HttpClient) { }

  //CRUD Functionality
  //Create New Program
  createProgram(program: Program): Observable<Program> {
    return this.httpClient.post<Program>(this.apiUrl, program);
  }
  //Get all Programs
  getPrograms(): Observable<Program[]>{
    return this.httpClient.get<Program[]>(this.apiUrl);

  }
  //Get Specific Program
  getPragramById(id: number): Observable<Program>{
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Program>(url)
  }
  //Update Functionality
  updateProgram(program: Program): Observable<Program>{
    const url = `${this.apiUrl}/${program.id}`;
    return this.httpClient.put<Program>(url, program)
  }
  //Delete Program
  deleteProgram(id: Number): Observable<void>{
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
