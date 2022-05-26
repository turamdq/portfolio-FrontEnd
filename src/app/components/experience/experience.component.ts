import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
// import { Portfolio } from '../../interfaces/portfolio'; APLICAR INTERFACE !!!!!!

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  url:string="http://localhost:3000/experience";
  
  experienceList:any;
  
  nuevoId: number = 0;

  id:string = "";
  name:string="";
  image:string = ""
  period: string = ""
  position:string = "";
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
  }

  agregarItem() {
    // console.log(this.name);
    this.nuevoId = new Date().getTime();
    console.log(this.nuevoId)
    const body = {id: this.nuevoId, name:this.name, image:this.image, period: this.period, position: this.position, tasks: this.tasks}
    this.datosPortfolio.agregarNuevo(this.url, body).subscribe();
  }

  borrarItem(){         
    this.datosPortfolio.borrarDatos(this.url, this.id).subscribe();
    this.leerDatos();    
  }

  //Obtiene los datos a modificar o el ID del elemento a eliminar

  itemAModificar(experience:any){
    this.id = `${experience.id}`;
    this.name = `${experience.name}`;
    this.image = `${experience.image}`;
    this.period = `${experience.period}`;
    this.position = `${experience.position}`;
    this.tasks = `${experience.tasks}`;
  }

  guardarCambios(){
    const body = {id: this.id, name:this.name, image:this.image, period: this.period, position: this.position, tasks: this.tasks}      
    this.datosPortfolio.modificarDatos(this.url, body).subscribe();
    this.leerDatos();
  }

  //vuelve a Cargar los datos guardados en la BDD
  
  descartarCambios() {
    return this.leerDatos();    
  }
}
