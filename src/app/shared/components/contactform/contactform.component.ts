import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { MatDialog } from '@angular/material/dialog';
import { ContactSuccessDialogComponent } from '../../../contact-success-dialog/contact-success-dialog.component';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [RouterModule, FormsModule, TranslatePipe],
  templateUrl: './contactform.component.html',
  styleUrl: './contactform.component.scss',
})
export class ContactformComponent {
  // NEU
  constructor(private dialog: MatDialog) {}

  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
    privacyAccepted: false, // Richtig so ?
  };

  mailTest = false; // false um live zu gehen!

  post = {
    endPoint: 'https://marcopalummieri.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.dialog.open(ContactSuccessDialogComponent, {
              width: '350px',
              panelClass: 'custom-dialog-container',
            });
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
      this.dialog.open(ContactSuccessDialogComponent, {
        width: '350px',
        panelClass: 'custom-dialog-container',
      });
    }
  }
}
