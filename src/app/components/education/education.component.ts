import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
// import { Portfolio } from '../../interfaces/portfolio'; APLICAR INTERFACE !!!!!!

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  
  url:string="http://localhost:3000/education";
  
  educationList: any;

  nuevoId: number = 0;

  id: string = "";
  name: string="";
  title: string = "";
  description: string = "";
  image: string = ""; 
  

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.leerDatos();    
  }

  //Funcion para obtener datos mediante el servicio

  leerDatos(){
    this.datosPortfolio.obtenerDatos(this.url).subscribe((response)=>{
      this.educationList = response;      
    });
    this.id = "";
    this.name ="";
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
      this.leerDatos();
    }
  
    borrarItem(){         
      this.datosPortfolio.borrarDatos(this.url, this.id).subscribe();
      this.leerDatos();    
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
      this.leerDatos();
    }
  
    //vuelve a Cargar los datos guardados en la BDD
    
    descartarCambios() {
      return this.leerDatos();    
    }
}
