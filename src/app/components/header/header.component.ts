import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUsuario } from 'src/app/models/login-usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  isLogginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password! : string;
  roles: string[] = [];
  errMsj!: string;

  datosList:any;  
  url:string="http://localhost:8080/header";

  constructor(private datosPortfolio:PortfolioService, private router:Router, private tokenService: TokenService, private authService: AuthService) { }

  ngOnInit(): void {
    
    this.leerDatos();
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }else{
      this.isLogged = false;
    }
    }

    //if(this.tokenService.getToken()){
    //  this.isLogged=true;
    //}else{
    //  this.isLogged = false;
    //}
  //}

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

  /*login(){
    this.router.navigate(['/login']);
  }*/

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
  }

  onLogin(): void{
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password); 
    this.authService.login(this.loginUsuario).subscribe(data =>{
        this.isLogged = true;
        this.isLogginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate([''])
        location.reload();
      }, err =>{
        this.isLogged = false;
        this.isLogginFail = true;
        this.errMsj = err.error.mensaje;
        console.log(this.errMsj);
        
      })
      
  }

}
