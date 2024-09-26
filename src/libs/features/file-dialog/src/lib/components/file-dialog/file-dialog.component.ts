import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FileDialogDesktopEditionComponent } from '../../versions/file-dialog-desktop-edition/file-dialog-desktop-edition.component';
import { FileDialogMobileEditionComponent } from '../../versions/file-dialog-mobile-edition/file-dialog-mobile-edition.component';

@Component({
  selector: 'apps-file-dialog',
  standalone: true,
  imports: [CommonModule, FileDialogDesktopEditionComponent, FileDialogMobileEditionComponent],
  providers: [],
  template: `
    @if ((size$ | async) === 'lg') {
    <apps-file-dialog-desktop-edition
      class="size-full overflow-hidden"
      [title]="title$ | async"
      [icon]="icon$ | async"
      (updateIcon)="updateIcon.emit($event)"
      (updateTitle)="updateTitle.emit($event)"
      (openEvent)="openEvent.emit($event)"
    />
    } @else {
    <apps-file-dialog-mobile-edition></apps-file-dialog-mobile-edition>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileDialogComponent {
  @Input({ required: true })
  public set size(size: 'xs' | 'lg' | null) {
    this._size$.next(size ?? 'xs');
  }

  private _size$ = new BehaviorSubject<'xs' | 'lg'>('xs');
  public size$ = this._size$.pipe();

  @Input()
  public set title(title: string | null) {
    this._title$.next(title ?? 'xs');
  }

  private _title$ = new BehaviorSubject<string>('nope');
  public title$ = this._title$.pipe();

  @Input()
  public set icon(title: string | null) {
    this._icon$.next(title ?? 'xs');
  }

  private _icon$ = new BehaviorSubject<string>('nope');
  public icon$ = this._icon$.pipe();

  @Output()
  public readonly updateIcon = new EventEmitter<string>();
  @Output()
  public readonly updateTitle = new EventEmitter<string>();
  @Output()
  public readonly openEvent = new EventEmitter<void>();
}
