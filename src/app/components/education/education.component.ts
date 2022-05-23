import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  educationList: any= [];

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    // this.datosPortfolio.obtenerDatos().subscribe(data => {
    //   this.educationList = data.education;
    // })
  }

}
