import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }

  
  // Leer a traves del metodo HTTP GET
  
  obtenerDatos(url: string): Observable<any> {
    return this.http.get(url);
    
  }

  modificarDatos(url: string, body: any): Observable<any> {
    const apiUrl = `${url}/${body.id}`;
    return this.http.put<void>(apiUrl, body);    
  }
}
