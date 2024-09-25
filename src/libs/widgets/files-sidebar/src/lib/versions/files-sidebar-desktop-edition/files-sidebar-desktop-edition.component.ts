import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';

import { FileTreeComponent } from '@apps/libs-features-file-tree';
import { FilesSidebarBaseComponent } from '../../components/files-sidebar-base/files-sidebar-base.component';

import { MatIconModule } from '@angular/material/icon';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesSidebarDesktopEditionComponent extends FilesSidebarBaseComponent {}
