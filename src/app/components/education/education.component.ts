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
      // console.log(this.name);
      this.nuevoId = new Date().getTime();      //Genera un numero basado en la fecha    
      const body = {id: this.nuevoId, name: this.name, title: this.title, description: this.description, image: this.image};
      this.datosPortfolio.agregarNuevo(this.url, body).subscribe();
      
      this.popUpAgregado();
      location.reload();
      //this.leerDatos();
    }
  
    borrarItem(){         
      this.datosPortfolio.borrarDatos(this.url, this.id).subscribe();
      
      this.popUpEliminado();
      location.reload();
      //this.leerDatos();    
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
      this.datosPortfolio.modificarDatos(this.url, body).subscribe();
      
      this.poUpModificacion();
      location.reload();
      //this.leerDatos();
    }
  
    //vuelve a Cargar los datos guardados en la BDD
    
    descartarCambios() {
      this.leerDatos();          
    }

    // Mensajes de Alerta (pasar a servicio)
  
  popUpEliminado() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1500
    })    
    Toast.fire({
      icon: 'warning',
      title: 'Educación eliminada'
    })
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

  popUpAgregado() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1500
    })    
    Toast.fire({
      icon: 'success',
      title: 'Estudio Agregado'
    })
  }
}