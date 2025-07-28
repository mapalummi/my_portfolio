import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-success-dialog',
  standalone: true,
  imports: [MatIconModule, TranslatePipe],
  templateUrl: './contact-success-dialog.component.html',
  styleUrl: './contact-success-dialog.component.scss',
})
export class ContactSuccessDialogComponent {
  private dialogRef = inject(MatDialogRef<ContactSuccessDialogComponent>);

  close() {
    this.dialogRef.close();
  }
}
