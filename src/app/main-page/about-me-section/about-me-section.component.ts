import { Component } from '@angular/core';
import {TranslatePipe, TranslateDirective} from "@ngx-translate/core";

@Component({
  selector: 'app-about-me-section',
  standalone: true,
  imports: [TranslatePipe, TranslateDirective],
  templateUrl: './about-me-section.component.html',
  styleUrl: './about-me-section.component.scss'
})
export class AboutMeSectionComponent {

}
