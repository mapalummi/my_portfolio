import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeroSectionComponent], //Hier richtig eingesetzt!??
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
