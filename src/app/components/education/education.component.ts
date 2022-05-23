import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  
  url:string="http://localhost:3000/education";
  
  educationList: any;

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.leerDatos()
    // this.datosPortfolio.obtenerDatos().subscribe(data => {
    //   this.educationList = data.education;
    // })
  }

  //Funcion para obtener datos mediante el servicio
  leerDatos(){
    this.datosPortfolio.obtenerDatos(this.url).subscribe((response)=>{
      this.educationList = response;      
    });
  }

}
