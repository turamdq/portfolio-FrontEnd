import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;

  datosList:any;  
  url:string="http://localhost:8080/header";

  constructor(private datosPortfolio:PortfolioService, private router:Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    
    this.leerDatos();

    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged = false;
    }
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
  }

  //vuelve a Cargar los datos guardados en la BDD

  descartarCambios() {
    return this.leerDatos();    
  }

  login(){
    this.router.navigate(['/login']);
  }

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
  }

}
