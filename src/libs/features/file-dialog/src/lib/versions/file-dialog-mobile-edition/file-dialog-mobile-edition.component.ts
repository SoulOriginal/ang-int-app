import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FileDialogBaseComponent } from '../../components/file-dialog-base/file-dialog-base.component';

@Component({
  selector: 'baranka-file-dialog-mobile-edition',
  standalone: true,
  templateUrl: './file-dialog-mobile-edition.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileDialogMobileEditionComponent extends FileDialogBaseComponent {}
