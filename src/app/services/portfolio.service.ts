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
    return this.http.put<void>(`${url}/${body.id}`, body);
        
  }

  borrarDatos(url: string, id: string): Observable<any> {
    return this.http.delete<void>(`${url}/${id}`);

}
  agregarNuevo(url: string, body: any): Observable<any>{
    return this.http.post<void>(`${url}`, body)
  }
}
