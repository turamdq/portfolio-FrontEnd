import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  datosList:any;
  url:string="http://localhost:3000/about";
  // miPortfolio: any;
  // sobreMi?: string;
  

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.listTodos();
    // this.datosPortfolio.obtenerDatos().subscribe(data => {
    //   console.log(data);
    //   this.miPortfolio=data;
    //   this.sobreMi = this.miPortfolio.about;
    // });
  }

  //Funcion para obtener datos mediante el servicio
  listTodos(){
    this.datosPortfolio.obtenerDatos(this.url).subscribe((response)=>{
      this.datosList = response;
      
    });
  }
  
  


}
