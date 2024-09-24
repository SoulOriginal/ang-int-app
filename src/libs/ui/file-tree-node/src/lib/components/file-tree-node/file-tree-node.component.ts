import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NestedTreeControl } from '@angular/cdk/tree';
import { NgcxTreeConfig, NgcxTreeNodeWrapper } from '../../models';
import { FileTreeNodeDesktopEditionComponent } from '../../versions/file-tree-node-desktop-edition/file-tree-node-desktop-edition.component';
import { FileTreeNodeMobileEditionComponent } from '../../versions/file-tree-node-mobile-edition/file-tree-node-mobile-edition.component';

@Component({
  selector: 'apps-file-tree-node',
  standalone: true,
  imports: [
    CommonModule,
    FileTreeNodeDesktopEditionComponent,
    FileTreeNodeMobileEditionComponent,
  ],
  providers: [],
  template: `
    @if ((size$ | async) === 'lg') {
    <apps-file-tree-node-desktop-edition
      [isSelected]="isSelected"
      [nodeWrapper]="nodeWrapper"
      [treeControl]="treeControl"
      [treeConfig]="treeConfig"
      (clickEvent)="clickEvent.emit($event)"
      (customEvent)="customEvent.emit($event)"
    ></apps-file-tree-node-desktop-edition>
    } @else {
    <apps-file-tree-node-mobile-edition></apps-file-tree-node-mobile-edition>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTreeNodeComponent {
  @Input({ required: true })
  public set size(size: 'xs' | 'lg' | null) {
    this._size$.next(size ?? 'xs');
  }

  private _size$ = new BehaviorSubject<'xs' | 'lg'>('xs');
  public size$ = this._size$.pipe();

  @Input() nodeWrapper!: NgcxTreeNodeWrapper<any>;
  @Input() treeControl!: NestedTreeControl<NgcxTreeNodeWrapper<any>, string>;
  @Input() treeConfig?: NgcxTreeConfig<any>;
  @Input() isSelected = false;

  @Output() customEvent = new EventEmitter<any>();
  @Output() clickEvent = new EventEmitter<void>();
}
