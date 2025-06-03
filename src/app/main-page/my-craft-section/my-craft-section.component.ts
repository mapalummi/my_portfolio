import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-my-craft-section',
  standalone: true,
  imports: [],
  templateUrl: './my-craft-section.component.html',
  styleUrl: './my-craft-section.component.scss'
})
export class MyCraftSectionComponent {
showBackToTop = false;

@HostListener('window:scroll', [])
onWindowScroll(){
  this.showBackToTop = window.pageYOffset > 300;
}

scrollToTop(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
}
