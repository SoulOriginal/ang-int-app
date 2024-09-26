import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FileTreeComponent } from '@apps/libs-features-file-tree';
import { FilesSidebarBaseComponent } from '../../components/files-sidebar-base/files-sidebar-base.component';

@Component({
  selector: 'apps-files-sidebar-desktop-edition',
  standalone: true,
  templateUrl: './files-sidebar-desktop-edition.component.html',
  imports: [
    CommonModule,
    FileTreeComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatIconModule,
    AsyncPipe,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesSidebarDesktopEditionComponent extends FilesSidebarBaseComponent {}
