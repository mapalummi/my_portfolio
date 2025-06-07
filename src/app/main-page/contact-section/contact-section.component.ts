import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { ContactformComponent } from '../../shared/components/contactform/contactform.component';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [ContactformComponent, FooterComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent {

}
