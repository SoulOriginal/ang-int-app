import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FileDialogBaseComponent } from '../../components/file-dialog-base/file-dialog-base.component';

@Component({
  selector: 'baranka-file-dialog-desktop-edition',
  standalone: true,
  templateUrl: './file-dialog-desktop-edition.component.html',
  imports: [CommonModule, MatInputModule, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileDialogDesktopEditionComponent extends FileDialogBaseComponent {}
