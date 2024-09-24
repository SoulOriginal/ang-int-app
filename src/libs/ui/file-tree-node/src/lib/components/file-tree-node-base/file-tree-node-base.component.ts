import { NestedTreeControl } from '@angular/cdk/tree';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NgcxTreeConfig, NgcxTreeNodeWrapper } from '../../models';

@Component({
  selector: 'apps-file-tree-node-base',
  standalone: true,
  template: '',
})
export class FileTreeNodeBaseComponent implements OnInit, OnDestroy {
  @Input() nodeWrapper!: NgcxTreeNodeWrapper<any>;
  @Input() treeControl!: NestedTreeControl<NgcxTreeNodeWrapper<any>, string>;
  @Input() treeConfig?: NgcxTreeConfig<any>;
  @Input() isSelected = false;

  @Output() customEvent = new EventEmitter<any>();
  @Output() clickEvent = new EventEmitter<void>();

  @ViewChild('ref', { read: ViewContainerRef, static: true })
  vcRef?: ViewContainerRef;

  ngUnsubscribe = new Subject();

  ngOnInit() {
    if (this.vcRef && this.treeConfig?.treeNodeContentComponent) {
      const nodeComponent = this.vcRef.createComponent(
        this.treeConfig.treeNodeContentComponent
      );
      nodeComponent.instance.nodeWrapper = this.nodeWrapper;

      nodeComponent.instance.customEvent
        ?.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((value: any) => this.customEvent.emit(value));
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(undefined);
    this.ngUnsubscribe.complete();
  }
}
