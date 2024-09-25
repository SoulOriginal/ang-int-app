import { EventEmitter, TemplateRef, Type } from '@angular/core';

export interface NgcxTreeConfig {
  treeNodeContentComponent?: Type<NgcxCustomComponent>;
  treeNodeContentTemplate?: TemplateRef<any>;

  allowDrop?: (
    node: NgcxTreeNodeWrapper,
    intoNode?: NgcxTreeNodeWrapper
  ) => boolean;
  preventDropReason?: (
    node: NgcxTreeNodeWrapper,
    intoNode?: NgcxTreeNodeWrapper
  ) => string | undefined;
  allowDrag?: (node: NgcxTreeNodeWrapper) => boolean;
  allowSelection?: (node: NgcxTreeNodeWrapper) => boolean;
}

export interface NgcxCustomComponent {
  nodeWrapper?: NgcxTreeNodeWrapper;
  customEvent?: EventEmitter<any>;
}

export interface NgcxTreeNode {
  id: string;
  title?: any;
  faIcon?: string;
  children?: NgcxTreeNode[];
}

export interface NgcxTreeNodeWrapper extends NgcxTreeNode {
  id: string;
  data: NgcxTreeNode;
  depth: number;
  index: number;
  isSelectable?: boolean;
  isFirstChild: boolean;
  isLastChild: boolean;
  children: NgcxTreeNodeWrapper[];
  parent?: NgcxTreeNodeWrapper;
  next?: NgcxTreeNodeWrapper;
  previous?: NgcxTreeNodeWrapper;
}

export interface NgcxTreeNodeComponent {
  nodeWrapper?: NgcxTreeNodeWrapper;
}

export interface NgcxTreeNodeMovedEvent {
  node: NgcxTreeNodeWrapper;
  parent?: NgcxTreeNodeWrapper;
  afterNode?: NgcxTreeNodeWrapper;
  beforeNode?: NgcxTreeNodeWrapper;
}
