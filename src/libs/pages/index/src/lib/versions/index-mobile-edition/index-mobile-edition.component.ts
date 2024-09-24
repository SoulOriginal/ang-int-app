import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IndexBaseComponent } from '../../components/index-base/index-base.component';

@Component({
  selector: 'apps-index-mobile-edition',
  standalone: true,
  templateUrl: './index-mobile-edition.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexMobileEditionComponent extends IndexBaseComponent {}
