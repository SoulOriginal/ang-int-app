import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FilesSidebarComponent } from '@apps/libs-widgets-files-sidebar';
import { IndexBaseComponent } from '../../components/index-base/index-base.component';

@Component({
  selector: 'apps-index-desktop-edition',
  standalone: true,
  templateUrl: './index-desktop-edition.component.html',
  imports: [CommonModule, FilesSidebarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexDesktopEditionComponent extends IndexBaseComponent {}
