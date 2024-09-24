import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FileTreeBaseComponent } from '../../components/file-tree-base/file-tree-base.component';

@Component({
  selector: 'apps-file-tree-mobile-edition',
  standalone: true,
  templateUrl: './file-tree-mobile-edition.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTreeMobileEditionComponent extends FileTreeBaseComponent {}
