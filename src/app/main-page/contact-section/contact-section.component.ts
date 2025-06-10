import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { ContactformComponent } from '../../shared/components/contactform/contactform.component';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [ContactformComponent, FooterComponent, TranslatePipe, TranslateDirective],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent {

}
