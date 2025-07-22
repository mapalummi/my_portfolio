import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobile-header',
  standalone: true,
  imports: [],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss',
})
export class MobileHeaderComponent {
  @Output() toggleMenu = new EventEmitter<void>();

  onMenuClick() {
    this.toggleMenu.emit();
  }
}
