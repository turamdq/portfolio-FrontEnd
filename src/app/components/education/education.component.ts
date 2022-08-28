import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  
  url:string="educacion";
  
  isLogged = false;
  educationList: any;
  nuevoId: number = 0;

  id: string = "";
  name: string= "";
  title: string = "";
  description: string = "";
  image: string = ""; 
  

  constructor(private datosPortfolio:PortfolioService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.leerDatos();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }         
  }

  //Funcion para obtener datos mediante el servicio

  leerDatos(){
    this.datosPortfolio.obtenerDatos(this.url).subscribe((response)=>{
      this.educationList = response;      
    });
    this.id = "";
    this.name = "";
    this.title = "";
    this.description = "";
    this.image = "";    
  }

    //Funcion para obtener datos mediante el servicio

    agregarItem() {      
      this.nuevoId = new Date().getTime();      //Genera un numero basado en la fecha    
      const body = {id: this.nuevoId, name: this.name, title: this.title, description: this.description, image: this.image};
      this.datosPortfolio.agregarNuevo(this.url, body).subscribe(data => {
        console.log(data);
        this.leerDatos();
  });          
      this.popUpAgregado();
    }
  
    borrarItem(){         
      this.datosPortfolio.borrarDatos(this.url, this.id).subscribe(data => {
        console.log(data);
        this.leerDatos();
  });      
      this.popUpEliminado();      
    }
  
    //Obtiene los datos a modificar o el ID del elemento a eliminar
  
    itemAModificar(education:any){
      this.id = `${education.id}`;
      this.name = `${education.name}`;
      this.title = `${education.title}`;
      this.description = `${education.description}`;
      this.image = `${education.image}`;
    }
  
    guardarCambios(){
      const body = {id: this.id, name: this.name, title: this.title, description: this.description, image: this.image};      
      this.datosPortfolio.modificarDatos(this.url, body).subscribe(data => {
        console.log(data);
        this.leerDatos();
  });          
      this.poUpModificacion();      
    }
  
    //vuelve a Cargar los datos guardados en la BDD
    
    descartarCambios() {
      this.leerDatos();          
    }

    // Mensajes de Alerta (pasar a servicio)
  
  popUpEliminado() {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      background: 'black',
      color: 'yellow',
      title: 'Educación Eliminada',
      showConfirmButton: false,
      timer: 2000
    });
  }

  poUpModificacion() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      background: 'black',
      color: 'white',
      title: 'Modificaciones Guardadas',
      showConfirmButton: false,
      timer: 2000
    });
  }

  popUpAgregado() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      background: 'black',
      color: 'white',
      title: 'Educación Agregada',
      showConfirmButton: false,
      timer: 2000
    });
  }
}