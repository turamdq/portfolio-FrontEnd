import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  datosList:any;
  url:string="http://localhost:8080/persona";


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
    this.poUpModificacion()    
  }

  //vuelve a Cargar los datos guardados en la BDD
  descartarCambios() {
    this.leerDatos();    
  }

  poUpModificacion() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1500
    })    
    Toast.fire({
      icon: 'success',
      title: 'Cambios guardados'
    })
  }
}