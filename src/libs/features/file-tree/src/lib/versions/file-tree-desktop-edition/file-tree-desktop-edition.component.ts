import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileTreeBaseComponent } from '../../components/file-tree-base/file-tree-base.component';

import { CdkTreeModule } from '@angular/cdk/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { FileTreeNodeComponent } from '@apps/libs-ui-file-tree-node';

@Component({
  selector: 'apps-file-tree-desktop-edition',
  standalone: true,
  styleUrl: './file-tree-desktop-edition.component.scss',
  templateUrl: './file-tree-desktop-edition.component.html',
  imports: [
    CommonModule,
    MatButtonModule,
    CdkTreeModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FileTreeNodeComponent,
    DragDropModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTreeDesktopEditionComponent extends FileTreeBaseComponent {}
