import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  datosList:any;
  backupDatos:any;
  url:string="http://localhost:3000/about/";
  

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.leerDatos();
    this.datosList = this.backupDatos
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
    return this.ngOnInit();    
  }
}
