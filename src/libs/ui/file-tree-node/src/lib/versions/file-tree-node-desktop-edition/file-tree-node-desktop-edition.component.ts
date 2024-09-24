import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FileTreeNodeBaseComponent } from '../../components/file-tree-node-base/file-tree-node-base.component';

@Component({
  selector: 'apps-file-tree-node-desktop-edition',
  standalone: true,
  styleUrls: ['./file-tree-node-desktop-edition.component.scss'],
  templateUrl: './file-tree-node-desktop-edition.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTreeNodeDesktopEditionComponent extends FileTreeNodeBaseComponent {}
