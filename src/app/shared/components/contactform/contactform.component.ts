import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contactform.component.html',
  styleUrl: './contactform.component.scss'
})
export class ContactformComponent {

  contactData = {
    name: "",
    email: "",
    message: "",
  }

onSubmit(ngForm: NgForm) {
  if (ngForm.valid && ngForm.submitted){
console.log(this.contactData);
  }
  
}

}
