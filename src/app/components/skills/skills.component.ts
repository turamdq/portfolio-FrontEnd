import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/services/token.service';
// import { Portfolio } from '../../interfaces/portfolio'; APLICAR INTERFACE !!!!!!

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  url:string="http://localhost:8080/skill";
  isLogged = false;
  
  skillsList: any;   
  //nuevoId: number = 0;

  id: string = "";
  name: string="";
  percent: string = "";
  outerStrokeColor: string = "";
  imageSrc: string = "";  
  
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
      this.skillsList = response;            
    });
    this.id = "";
    this.name ="";
    this.percent = "";
    this.outerStrokeColor = "";
    this.imageSrc = "";
  }

  agregarItem() {    
    //this.nuevoId = new Date().getTime();      //Genera un numero basado en la fecha        
    //saco la parte id del body dado q lo genera automaticamente el back id: this.nuevoId, 
    const body = {name:this.name, percent:this.percent, outerStrokeColor: this.outerStrokeColor, imageSrc: this.imageSrc};
    this.datosPortfolio.agregarNuevo(this.url, body).subscribe();
    
    this.popUpAgregado();
    this.leerDatos();
    this.leerDatos();    
  }

  borrarItem(){         
    this.datosPortfolio.borrarDatos(this.url, this.id).subscribe();
    
    this.popUpEliminado();
    this.leerDatos();
    this.leerDatos();    
  }

  //Obtiene los datos a modificar o el ID del elemento a eliminar

  itemAModificar(skill:any){
    this.id = `${skill.id}`;
    this.name = `${skill.name}`;
    this.percent = `${skill.percent}`;
    this.outerStrokeColor = `${skill.outerStrokeColor}`;
    this.imageSrc = `${skill.imageSrc}`;
  }

  guardarCambios(){
    const body = {id: this.id, name:this.name, percent:this.percent, outerStrokeColor: this.outerStrokeColor, imageSrc: this.imageSrc};     
    this.datosPortfolio.modificarDatos(this.url, body).subscribe();
    
    this.poUpModificacion();
    this.leerDatos();
    this.leerDatos();        
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
      title: 'Skill eliminada'
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
      title: 'Skill Agregada'
    })
  }
}