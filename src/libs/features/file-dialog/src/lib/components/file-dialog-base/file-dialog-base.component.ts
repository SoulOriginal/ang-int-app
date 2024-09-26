import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { BlankingSnackBarService } from '@apps/libs-shared-utils-services-blanking-snack-bar';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'baranka-file-dialog-base',
  standalone: true,
  template: '',
})
export class FileDialogBaseComponent {
  private _blankingSnackBarService = inject(BlankingSnackBarService);

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



  public handleClickedOpen() {
    this.openEvent.emit();
  }
  public handleSelectedIcon(name: string) {
    this.updateIcon.emit(name);
  }

  public handleInputEvent(event: Event) {
    const getValue = (event.target as HTMLInputElement).value;
    this.updateTitle.emit(getValue);
  }

  public openSnackBar() {
    this._blankingSnackBarService.openSnackBar();
  }
  public matIconsList = [
    'folder',
    'rule_folder',
    'folder_delete',
    'folder_shared',
    'folder_open',
    'folder_zip',
    'image',
    'description',
    'task',
    'topic',
    'file_present',
    'note_add',
  ];
}
