import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FileTreeNodeBaseComponent } from '../../components/file-tree-node-base/file-tree-node-base.component';

@Component({
  selector: 'apps-file-tree-node-mobile-edition',
  standalone: true,
  templateUrl: './file-tree-node-mobile-edition.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTreeNodeMobileEditionComponent extends FileTreeNodeBaseComponent {}
