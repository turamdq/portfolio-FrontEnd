import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }

  // obtenerDatos():Observable<any> {
  //   return this.http.get('./assets/data/data.json');
  // }

  // Leer a traves del metodo HTTP GET
  
  obtenerDatos(url: string): Observable<any> {
    return this.http.get(url);   // `${this.apiUrl}` pasa el valor guardado en apiUrl
    
  }

  modificarDatos(url: string, body: any): Observable<any> {
    return this.http.put(url, body);
  }
}
