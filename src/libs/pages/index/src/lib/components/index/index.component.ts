import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ScreenBreakpointObserverService } from '@apps/shared-utils-services-screen-breakpoint-observer';
import { IndexDesktopEditionComponent } from '../../versions/index-desktop-edition/index-desktop-edition.component';
import { IndexMobileEditionComponent } from '../../versions/index-mobile-edition/index-mobile-edition.component';

@Component({
  selector: 'apps-index',
  standalone: true,
  imports: [
    CommonModule,
    IndexDesktopEditionComponent,
    IndexMobileEditionComponent,
  ],
  providers: [],
  template: `
    @if ((size$ | async) === 'lg') {
    <apps-index-desktop-edition></apps-index-desktop-edition>
    } @else {
    <apps-index-mobile-edition></apps-index-mobile-edition>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {
  public size$ = inject(ScreenBreakpointObserverService).size$;
}
