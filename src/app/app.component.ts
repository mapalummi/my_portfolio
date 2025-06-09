import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { FooterComponent } from "./footer/footer.component";
// import { HeaderComponent } from './header/header.component';
// import { JoinComponent } from './pages/join/join.component';
// import { ElPolloLocoComponent } from './pages/el-pollo-loco/el-pollo-loco.component';
// import { DaBubbleComponent } from './pages/da-bubble/da-bubble.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my_portfolio';

  
}
