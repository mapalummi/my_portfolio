import { Component } from '@angular/core';

@Component({
  selector: 'app-my-stack-section',
  standalone: true,
  imports: [],
  templateUrl: './my-stack-section.component.html',
  styleUrl: './my-stack-section.component.scss'
})
export class MyStackSectionComponent {
isPeeled = false;

togglePeel(){
  this.isPeeled = !this.isPeeled;
}
}
