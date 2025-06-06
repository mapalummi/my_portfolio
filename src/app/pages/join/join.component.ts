import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss'
})
export class JoinComponent {

}
