import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FileTreeDesktopEditionComponent } from '../../versions/file-tree-desktop-edition/file-tree-desktop-edition.component';
import { FileTreeMobileEditionComponent } from '../../versions/file-tree-mobile-edition/file-tree-mobile-edition.component';

import { NgcxTreeConfig, NgcxTreeNode, NgcxTreeNodeMovedEvent, NgcxTreeNodeWrapper } from '../../models';

@Component({
  selector: 'apps-file-tree',
  standalone: true,
  imports: [CommonModule, FileTreeDesktopEditionComponent, FileTreeMobileEditionComponent],
  providers: [],
  template: `
    @if ((size$ | async) === 'lg') {
    <apps-file-tree-desktop-edition
      [nodes]="nodes"
      [config]="config"
      (customEvent)="customEvent.emit($event)"
      (clickEvent)="clickEvent.emit($event)"
      (selectEvent)="selectEvent.emit($event)"
      (updatedNodes)="updatedNodes.emit($event)"
    ></apps-file-tree-desktop-edition>
    } @else {
    <apps-file-tree-mobile-edition></apps-file-tree-mobile-edition>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTreeComponent {
  @Input({ required: true })
  public set size(size: 'xs' | 'lg' | null) {
    this._size$.next(size ?? 'xs');
  }

  private _size$ = new BehaviorSubject<'xs' | 'lg'>('xs');
  public size$ = this._size$.pipe();

  @Input() nodes?: NgcxTreeNode[];
  @Input() config?: NgcxTreeConfig<NgcxTreeNode>;

  @Output() nodeMoved = new EventEmitter<NgcxTreeNodeMovedEvent<NgcxTreeNode>>();
  @Output() customEvent = new EventEmitter<any>();
  @Output() clickEvent = new EventEmitter<NgcxTreeNodeWrapper<NgcxTreeNode>>();
  @Output() selectEvent = new EventEmitter<NgcxTreeNodeWrapper<NgcxTreeNode>>();
  @Output() updatedNodes = new EventEmitter<NgcxTreeNode>();
}
