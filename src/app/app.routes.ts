import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { JoinComponent } from './pages/join/join.component';
import { ElPolloLocoComponent } from './pages/el-pollo-loco/el-pollo-loco.component';
import { DaBubbleComponent } from './pages/da-bubble/da-bubble.component';

import { PokedexComponent } from './pages/pokedex/pokedex.component';

import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'join', component: JoinComponent },
  { path: 'elPolloLoco', component: ElPolloLocoComponent },
  { path: 'daBubble', component: DaBubbleComponent },

  { path: 'pokedex', component: PokedexComponent },
  
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent }
];
