import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FileTreeComponent } from '@apps/libs-features-file-tree';
import { IndexBaseComponent } from '../../components/index-base/index-base.component';

@Component({
  selector: 'apps-index-desktop-edition',
  standalone: true,
  templateUrl: './index-desktop-edition.component.html',
  imports: [CommonModule, FileTreeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexDesktopEditionComponent extends IndexBaseComponent {}
