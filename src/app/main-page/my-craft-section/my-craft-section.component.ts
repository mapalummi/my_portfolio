import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-my-craft-section',
  standalone: true,
  imports: [RouterModule, TranslatePipe, TranslateDirective],
  templateUrl: './my-craft-section.component.html',
  styleUrl: './my-craft-section.component.scss',
})
export class MyCraftSectionComponent {}
