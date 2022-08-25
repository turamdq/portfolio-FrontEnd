import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/services/token.service';
// import { Portfolio } from '../../interfaces/portfolio'; APLICAR INTERFACE !!!!!!

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  url:string="proyecto";
  
  isLogged = false;
  projectsList:any;   
  //nuevoId: number = 0;

  id: string = "";
  name: string="";  
  description: string = "";
  dates: string = "";
  image: string = "";  
  link: string = "";

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
      this.projectsList = response;            
    });
    this.id = "";
    this.name ="";
    this.description = "";
    this.dates = "";
    this.image = "";
    this.link = "";
  }

  agregarItem() {    
    //this.nuevoId = new Date().getTime();      //Genera un numero basado en la fecha id: this.nuevoId,    
    const body = {name:this.name, description: this.description, dates: this.dates, image: this.image, link: this.link};
    this.datosPortfolio.agregarNuevo(this.url, body).subscribe();
    
    this.popUpAgregado();
    location.reload();
    //this.leerDatos();    
  }

  borrarItem(){         
    this.datosPortfolio.borrarDatos(this.url, this.id).subscribe();
    
    this.popUpEliminado();
    
    //this.leerDatos();
    location.reload();    
  }

  //Obtiene los datos a modificar o el ID del elemento a eliminar

  itemAModificar(project:any){
    this.id = `${project.id}`;
    this.name = `${project.name}`;
    this.description = `${project.description}`;
    this.dates = `${project.dates}`;
    this.image = `${project.image}`;
    this.link = `${project.link}`;
  }

  guardarCambios(){
    const body = {id: this.id, name:this.name, description:this.description, dates:this.dates, image:this.image, link:this.link};     
    this.datosPortfolio.modificarDatos(this.url, body).subscribe();
    
    this.poUpModificacion();
    location.reload();
    //this.leerDatos();        
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