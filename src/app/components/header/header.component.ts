import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // loggedIn:boolean = false;
  datosList:any;  
  url:string="http://localhost:3000/header/";

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.leerDatos();
  }

  //Funcion para obtener datos mediante el servicio

  leerDatos(){
    this.datosPortfolio.obtenerDatos(this.url).subscribe((response)=>{
      this.datosList = response;           
    });
  }

  guardarCambios(dato:any){
    console.log(dato);     
    this.datosPortfolio.modificarDatos(this.url, dato).subscribe();    
  }

  //vuelve a Cargar los datos guardados en la BDD

  descartarCambios() {
    return this.leerDatos();    
  }
}
