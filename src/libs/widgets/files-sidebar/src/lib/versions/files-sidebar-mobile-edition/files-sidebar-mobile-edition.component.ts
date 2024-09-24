import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FilesSidebarBaseComponent } from '../../components/files-sidebar-base/files-sidebar-base.component';

@Component({
  selector: 'apps-files-sidebar-mobile-edition',
  standalone: true,
  templateUrl: './files-sidebar-mobile-edition.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesSidebarMobileEditionComponent extends FilesSidebarBaseComponent {}
