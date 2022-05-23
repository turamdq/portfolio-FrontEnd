import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  url:string="http://localhost:3000/experience";
  experienceList:any;

  // experienceList: any = [];

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.leerDatos();
    // this.datosPortfolio.obtenerDatos().subscribe(data => {
    //   this.experienceList = data.experience;
    // });
  }

  //Funcion para obtener datos mediante el servicio
  leerDatos(){
    this.datosPortfolio.obtenerDatos(this.url).subscribe((response)=>{
      this.experienceList = response;      
    });
  }

}
