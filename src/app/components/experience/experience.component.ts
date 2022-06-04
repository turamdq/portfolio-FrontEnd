import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import Swal from 'sweetalert2';
// import { Portfolio } from '../../interfaces/portfolio'; APLICAR INTERFACE !!!!!!

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  url:string="http://localhost:3000/experience";
  
  // loggedIn:boolean = false;
  experienceList:any;   
  nuevoId: number = 0;

  id: string = "";
  name: string="";
  image: string = "";
  startDate: string = "";
  endDate: string = "";
  period: string = "";
  position: string = "";
  tasks: string = "";  

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.leerDatos();        
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
    this.endDate = "";
    this.period = "";
    this.position = "";
    this.tasks = "";
  }

  agregarItem() {    
    this.nuevoId = new Date().getTime();      //Genera un numero basado en la fecha    
    const body = {id: this.nuevoId, name:this.name, image:this.image, startDate: this.startDate, endDate: this.endDate, period: this.period, position: this.position, tasks: this.tasks};
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
    this.image = `${experience.image}`;
    this.startDate = `${experience.startDate}`;
    this.endDate = `${experience.endDate}`;
    this.period = `${experience.period}`;
    this.position = `${experience.position}`;
    this.tasks = `${experience.tasks}`;
  }

  guardarCambios(){
    const body = {id: this.id, name:this.name, image:this.image,startDate: this.startDate, endDate: this.endDate, period: this.period, position: this.position, tasks: this.tasks};     
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