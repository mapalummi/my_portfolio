import { Component } from '@angular/core';
import {TranslatePipe, TranslateDirective} from "@ngx-translate/core";
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-about-me-section',
  standalone: true,
  imports: [TranslatePipe, TranslateDirective],
  templateUrl: './about-me-section.component.html',
  styleUrl: './about-me-section.component.scss'
})
export class AboutMeSectionComponent {
constructor(private viewportScroller: ViewportScroller){}

scrollToSection(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId)
  }
}
