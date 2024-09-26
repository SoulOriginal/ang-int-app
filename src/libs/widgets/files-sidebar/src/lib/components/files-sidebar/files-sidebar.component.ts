import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CreationItemsService } from '../../services';
import { FilesSidebarDesktopEditionComponent } from '../../versions/files-sidebar-desktop-edition/files-sidebar-desktop-edition.component';
import { FilesSidebarMobileEditionComponent } from '../../versions/files-sidebar-mobile-edition/files-sidebar-mobile-edition.component';

@Component({
  selector: 'apps-files-sidebar',
  standalone: true,
  imports: [CommonModule, FilesSidebarDesktopEditionComponent, FilesSidebarMobileEditionComponent],
  providers: [CreationItemsService],
  template: `
    @if ((size$ | async) === 'lg') {
    <apps-files-sidebar-desktop-edition></apps-files-sidebar-desktop-edition>
    } @else {
    <apps-files-sidebar-mobile-edition></apps-files-sidebar-mobile-edition>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesSidebarComponent {
  @Input({ required: true })
  public set size(size: 'xs' | 'lg' | null) {
    this._size$.next(size ?? 'xs');
  }

  private _size$ = new BehaviorSubject<'xs' | 'lg'>('xs');
  public size$ = this._size$.pipe();
}
