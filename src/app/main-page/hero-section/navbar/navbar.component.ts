import { Component } from '@angular/core';
import { AboutMeSectionComponent } from "../../about-me-section/about-me-section.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AboutMeSectionComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}

//TODO: if/else für toggle language !!!