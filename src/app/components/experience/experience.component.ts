import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  url:string="experiencia";
  
  isLogged = false;
  experienceList:any;   
  nuevoId: number = 0;

  id: string = "";
  name: string="";
  image: string = "";
  startDate: string = "";
  endDate: string = "";
  position: string = "";
  tasks: string = "";  

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
      this.experienceList = response;            
    });
    this.id = "";
    this.name ="";
    this.image = "";
    this.startDate = "";
    this.endDate = ""
    this.position = "";
    this.tasks = "";
    
  }
  
  agregarItem() {    
    this.nuevoId = new Date().getTime();      //Genera un numero basado en la fecha    
    const body = {id: this.nuevoId, name:this.name, image:this.image, startDate: this.startDate, endDate: this.endDate, position: this.position, tasks: this.tasks};
    this.datosPortfolio.agregarNuevo(this.url, body).subscribe();
    
    this.popUpAgregado();
  }

  borrarItem(){         
    this.datosPortfolio.borrarDatos(this.url, this.id).subscribe();    
    this.popUpEliminado();
  }

  //Obtiene los datos a modificar o el ID del elemento a eliminar

  itemAModificar(experience:any){
    this.id = `${experience.id}`;
    this.name = `${experience.name}`;
    this.image = `${experience.image}`;
    this.startDate = `${experience.startDate}`;
    this.endDate = `${experience.endDate}`;
    this.position = `${experience.position}`;
    this.tasks = `${experience.tasks}`;
  }


  //quite period: this.period
  guardarCambios(){
    const body = {id: this.id, name:this.name, image:this.image,startDate: this.startDate, endDate: this.endDate, position: this.position, tasks: this.tasks};     
    this.datosPortfolio.modificarDatos(this.url, body).subscribe();    
    this.poUpModificacion();            
  }

  //vuelve a Cargar los datos guardados en la BDD
  
  descartarCambios() {
    this.leerDatos();       
  }

  recargar() {
    location.reload();
  }  

  // Mensajes de Alerta
  
  popUpEliminado() {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      background: 'black',
      color: 'yellow',
      title: 'Experiencia eliminada',
      showConfirmButton: false,
      timer: 2500
    });
    this.recargar();
  }

  poUpModificacion() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      background: 'black',
      color: 'white',
      title: 'Cambios guardados',
      showConfirmButton: false,
      timer: 2500
    });
    this.recargar();
  }

  popUpAgregado() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      background: 'black',
      color: 'white',
      title: 'Experiencia agragada',
      showConfirmButton: false,
      timer: 2500
    });
    this.recargar();
  }
}