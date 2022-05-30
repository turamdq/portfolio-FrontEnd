import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import Swal from 'sweetalert2';
// import { Portfolio } from '../../interfaces/portfolio'; APLICAR INTERFACE !!!!!!

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  url:string="http://localhost:3000/projects";
  
  // loggedIn:boolean = false;
  projectsList:any;   
  nuevoId: number = 0;

  id: string = "";
  name: string="";  
  description: string = "";
  date: string = "";
  image: string = "";  
  link: string = "";

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.leerDatos();
  }

  //Funcion para obtener datos mediante el servicio
  leerDatos(){
    this.datosPortfolio.obtenerDatos(this.url).subscribe((response)=>{
      this.projectsList = response;            
    });
    this.id = "";
    this.name ="";
    this.description = "";
    this.date = "";
    this.image = "";
    this.link = "";
  }

  agregarItem() {    
    this.nuevoId = new Date().getTime();      //Genera un numero basado en la fecha    
    const body = {id: this.nuevoId, name:this.name, description: this.description, date: this.date, image: this.image, link: this.link};
    this.datosPortfolio.agregarNuevo(this.url, body).subscribe();
    this.leerDatos();
    this.leerDatos();
    this.popUpAgregado();    
  }

  borrarItem(){         
    this.datosPortfolio.borrarDatos(this.url, this.id).subscribe();
    this.leerDatos();
    this.leerDatos();
    this.popUpEliminado();    
  }

  //Obtiene los datos a modificar o el ID del elemento a eliminar

  itemAModificar(experience:any){
    this.id = `${experience.id}`;
    this.name = `${experience.name}`;
    this.description = `${experience.description}`;
    this.date = `${experience.date}`;
    this.image = `${experience.image}`;
    this.link = `${experience.link}`;
  }

  guardarCambios(){
    const body = {id: this.id, name:this.name, description:this.description, date:this.date, image:this.image, link:this.link};     
    this.datosPortfolio.modificarDatos(this.url, body).subscribe();
    this.leerDatos();
    this.leerDatos();
    this.poUpModificacion();        
  }

  //vuelve a Cargar los datos guardados en la BDD
  
  descartarCambios() {
    this.leerDatos();       
  }

  // Mensajes de Alerta
  
  popUpEliminado() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1500
    })    
    Toast.fire({
      icon: 'warning',
      title: 'Empleo eliminado'
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
      title: 'Empleo Agregado'
    })
  }
}