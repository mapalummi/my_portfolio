import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { JoinComponent } from './main-page/join/join.component';
import { ElPolloLocoComponent } from './main-page/el-pollo-loco/el-pollo-loco.component';
import { DaBubbleComponent } from './main-page/da-bubble/da-bubble.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'join', component: JoinComponent },
  { path: 'elPolloLoco', component: ElPolloLocoComponent},
  { path: 'daBubble', component: DaBubbleComponent },
];
