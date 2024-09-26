import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FileDialogComponent } from '../components/file-dialog/file-dialog.component';

@Injectable()
export class FileDialogService {
  private dialog = inject(MatDialog);

  openDialog(size: 'xs' | 'lg', customDialogConfig?: MatDialogConfig): MatDialogRef<FileDialogComponent> {
    let config: MatDialogConfig;

    if (size === 'lg') {
      config = {
        width: '300px',
        height: '100%',
        maxHeight: '100vh',
        panelClass: ['apps-dialog'],
        position: {
          right: '0',
          top: '0',
          bottom: '0',
        },
      };
    } else {
      config = {
        width: '100%',
        height: 'auto',
        maxHeight: '100dvh',
        maxWidth: '100%',
        position: {
          bottom: '0',
        },
        panelClass: ['apps-dialog'],
      };
    }

    const dialogRef = this.dialog.open(FileDialogComponent, {
      autoFocus: false,
      ...config,
      ...customDialogConfig,
    });
    dialogRef.componentInstance.size = size;

    return dialogRef;
  }
}
