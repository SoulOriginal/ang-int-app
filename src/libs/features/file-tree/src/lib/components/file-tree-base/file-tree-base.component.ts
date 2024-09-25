import { CdkDrag, CdkDragRelease, CdkDropList } from '@angular/cdk/drag-drop';
import { NestedTreeControl, NestedTreeControlOptions } from '@angular/cdk/tree';

import { DataSource } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  NgcxTreeConfig,
  NgcxTreeNode,
  NgcxTreeNodeMovedEvent,
  NgcxTreeNodeWrapper,
} from '../../models';
import { isParentOf } from '../../utils/is-parent-of';
@Component({
  selector: 'apps-file-tree-base',
  standalone: true,
  template: '',
})
export class FileTreeBaseComponent {
  onDrop() {
    console.log('Item dropped inside the tree:');
    // Логика обработки после сброса внутри компонента дерева
  }

  @Input() nodes?: NgcxTreeNode[];
  @Input() config?: NgcxTreeConfig<NgcxTreeNode>;

  @Output() nodeMoved = new EventEmitter<
    NgcxTreeNodeMovedEvent<NgcxTreeNode>
  >();
  @Output() customEvent = new EventEmitter<any>();
  @Output() updatedNodes = new EventEmitter<NgcxTreeNode>();
  @Output() clickEvent = new EventEmitter<NgcxTreeNodeWrapper<NgcxTreeNode>>();
  @Output() selectEvent = new EventEmitter<NgcxTreeNodeWrapper<NgcxTreeNode>>();

  /**
   * Api for finding and selecting node. Extends from the CDK treeControl for expanding/collapsing the tree
   */
  public readonly treeControl: NgcxTreeControl = new NgcxTreeControl(
    this,
    (node) => node.children,
    {
      trackBy: (node: NgcxTreeNodeWrapper<NgcxTreeNode>) => node.id,
    }
  );

  dataSource: NgcxTreeDataSource<NgcxTreeNodeWrapper<NgcxTreeNode>> =
    new NgcxTreeDataSource<NgcxTreeNodeWrapper<NgcxTreeNode>>([]);

  protected dragging?: NgcxTreeNodeWrapper<NgcxTreeNode>;

  protected selectedNode?: NgcxTreeNodeWrapper<NgcxTreeNode>;

  protected readonly DropType = DropType;

  protected readonly disable = () => false;

  private canceledByEsc?: boolean;

  ngOnInit(): void {
    this.updateTree();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nodes']) {
      if (this.treeControl) {
        // initialized already
        this.updateTree();
      }
      if (this.selectedNode) {
        const selectedNodeId = this.selectedNode.id;
        setTimeout(() => this.treeControl.selectNodeById(selectedNodeId));
      }
    }
  }

  private updateTree() {
    const wrapperNodes = this.createWrapperNodes(this.nodes ?? []);
    this.dataSource = new NgcxTreeDataSource(wrapperNodes);
    this.treeControl.dataNodes = this.dataSource.data$.value;
  }

  private createWrapperNodes(
    nodes: NgcxTreeNode[],
    parent?: NgcxTreeNodeWrapper<NgcxTreeNode>,
    depth: number = 0
  ): NgcxTreeNodeWrapper<NgcxTreeNode>[] {
    const childCount = nodes.length;
    const wrapperNodes = nodes.map((node, idx) => {
      const nodeWrapper: NgcxTreeNodeWrapper<NgcxTreeNode> = {
        id: node.id,
        data: <NgcxTreeNode>node,
        isFirstChild: idx === 0,
        isLastChild: idx === childCount - 1,
        index: idx,
        parent: parent,
        depth: depth,
        children: [],
      };
      nodeWrapper.children = node.children
        ? this.createWrapperNodes(node.children, nodeWrapper, depth + 1)
        : [];

      return nodeWrapper;
    });
    wrapperNodes.forEach((wrapperNode) => {
      if (!wrapperNode.isLastChild) {
        wrapperNode.next = wrapperNodes[wrapperNode.index + 1];
      }
      if (!wrapperNode.isFirstChild) {
        wrapperNode.previous = wrapperNodes[wrapperNode.index - 1];
      }
      if (this.config?.allowSelection?.(wrapperNode)) {
        wrapperNode.isSelectable = true;
      }
    });
    return wrapperNodes;
  }

  protected hideDrop(
    dropNode: NgcxTreeNodeWrapper<NgcxTreeNode>,
    dropType: DropType
  ): boolean {
    if (
      !this.dragging ||
      this.dragging.id === dropNode.id ||
      isParentOf(this.dragging, dropNode)
    ) {
      return true;
    }
    if (
      dropType == DropType.DROP_INTO &&
      dropNode.id === this.dragging.parent?.id
    ) {
      return true;
    }
    if (
      dropType == DropType.DROP_AFTER &&
      dropNode.next?.id === this.dragging.id
    ) {
      return true;
    }
    if (
      dropType == DropType.DROP_BEFORE &&
      dropNode.previous?.id === this.dragging.id
    ) {
      return true;
    }
    return false;
  }

  protected allowDrop(
    dropNode: NgcxTreeNodeWrapper<NgcxTreeNode>,
    dropType: DropType
  ): DropControl {
    const hideDrop = this.hideDrop(dropNode, dropType);

    const intoNode =
      dropType == DropType.DROP_INTO ? dropNode : dropNode.parent;

    let preventDropReason;
    let allowDrop = true;
    if (this.config?.preventDropReason && this.dragging) {
      preventDropReason = this.config.preventDropReason(
        this.dragging,
        intoNode
      );
    }
    if (this.config?.allowDrop && this.dragging) {
      allowDrop = this.config.allowDrop(this.dragging, intoNode);
    }

    return new DropControl(
      hideDrop,
      !allowDrop || !!preventDropReason,
      preventDropReason
    );
  }

  // prevent drop directly after a node on same level, that is expanded
  protected sortPredicate(): (
    index: number,
    drag: CdkDrag,
    drop: CdkDropList
  ) => boolean {
    return (
      index: number,
      _drag: CdkDrag<NgcxTreeNodeWrapper<NgcxTreeNode>>,
      drop: CdkDropList<NgcxTreeNodeWrapper<NgcxTreeNode>>
    ) => {
      return index == 0 || !this.treeControl.isExpanded(drop.data);
    };
  }

  protected disableDrag(node: NgcxTreeNodeWrapper<NgcxTreeNode>) {
    return this.config?.allowDrag ? !this.config.allowDrag(node) : false;
  }

  protected keyDownArrowUp(event: Event) {
    if (this.selectedNode) {
      if (!this.selectedNode.isFirstChild) {
        this.selectNode(this.selectedNode.previous);
      } else if (this.selectedNode.parent) {
        this.selectNode(this.selectedNode.parent);
      }
    } else {
      const nodes = this.dataSource.data$.value;
      if (nodes.length > 0) {
        this.selectNode(nodes[nodes.length - 1]);
      }
    }
    event.preventDefault();
  }

  protected keyDownArrowDown(event: Event) {
    if (this.selectedNode) {
      if (!this.selectedNode.isLastChild) {
        this.selectNode(this.selectedNode.next);
      } else if (this.selectedNode.parent?.next) {
        this.selectNode(this.selectedNode.parent.next);
      }
    } else {
      const nodes = this.dataSource.data$.value;
      if (nodes.length > 0) {
        this.selectNode(nodes[0]);
      }
    }
    event.preventDefault();
  }

  protected keyDownArrowLeft(event: Event) {
    if (this.selectedNode) {
      if (this.treeControl.isExpanded(this.selectedNode)) {
        this.treeControl.collapse(this.selectedNode);
      } else if (this.selectedNode?.parent) {
        this.selectNode(this.selectedNode.parent);
      }
    } else {
      const nodes = this.dataSource.data$.value;
      if (nodes.length > 0) {
        this.selectNode(nodes[0]);
      }
    }
    event.preventDefault();
  }

  protected keyDownArrowRight(event: Event) {
    if (this.selectedNode && this.selectedNode.children.length > 0) {
      this.selectNode(this.selectedNode.children[0]);
    } else if (!this.selectedNode) {
      const nodes = this.dataSource.data$.value;
      if (nodes.length > 0) {
        this.selectNode(nodes[0]);
      }
    }
    event.preventDefault();
  }

  @HostListener('window:keydown.escape')
  protected keyEscapeWhileDragging() {
    if (this.dragging) {
      this.canceledByEsc = true;
      document.dispatchEvent(new Event('mouseup'));
    }
  }

  protected handleDragRelease(
    event: CdkDragRelease<NgcxTreeNodeWrapper<NgcxTreeNode>>
  ) {
    this.handleDragReleaseInternal(event);
    this.dragging = undefined;
  }

  private handleDragReleaseInternal(
    event: CdkDragRelease<NgcxTreeNodeWrapper<NgcxTreeNode>>
  ) {
    const movedNode = event.source.data;
    const target = <HTMLDivElement>event.event.target;
    const dropZoneId = target.id ?? target.parentElement?.id;
    console.log(dropZoneId);
    if (!dropZoneId) {
      // no valid drop zone
      // return;
    }

    const dropZoneInfo = new DropZoneInfo(dropZoneId);
    const toNode = this.treeControl.findNodeById(dropZoneInfo.nodeId);
    console.log(toNode);
    if (!toNode) {
      console.error(`node with id '${dropZoneInfo.nodeId}' could not be found`);
      return;
    }

    const dropControl = this.allowDrop(toNode, dropZoneInfo.dropType);
    if (dropControl.hideDrop || dropControl.preventDrop) {
      return;
    }

    // dropType undefined can happen if dropped directly without moving
    if (this.canceledByEsc || dropZoneInfo.dropType === undefined) {
      this.canceledByEsc = false;
      return;
    }

    const insertIntoNode =
      dropZoneInfo.dropType === DropType.DROP_INTO ? toNode : toNode.parent;
    const wrapperList = insertIntoNode?.children ?? this.dataSource.data$.value;
    const addAtNodeIdx = this.findAddIndex(
      dropZoneInfo,
      insertIntoNode,
      wrapperList
    );

    const removedFromIdx = this.removeElementFromPreviousPosition(movedNode);
    // add element to new Position, subtract one if inserted in same list after the remove position
    (insertIntoNode?.data.children ?? this.nodes!).splice(
      movedNode.parent?.id === insertIntoNode?.id &&
        removedFromIdx < addAtNodeIdx
        ? addAtNodeIdx - 1
        : addAtNodeIdx,
      0,
      movedNode.data
    );

    const afterNodeIdx = addAtNodeIdx - 1;
    const afterNode =
      afterNodeIdx > -1 && wrapperList.length > afterNodeIdx
        ? wrapperList[afterNodeIdx]
        : undefined;

    const beforeNode =
      addAtNodeIdx > -1 && wrapperList.length > addAtNodeIdx
        ? wrapperList[addAtNodeIdx]
        : undefined;

    this.nodeMoved.emit({
      node: movedNode,
      parent:
        dropZoneInfo.dropType === DropType.DROP_INTO ? toNode : toNode.parent,
      afterNode: afterNode,
      beforeNode: beforeNode,
    });
    this.dataSource = new NgcxTreeDataSource(
      this.createWrapperNodes(this.nodes!)
    );
    this.treeControl.dataNodes = this.dataSource.data$.value;
    this.updatedNodes.emit(this.treeControl.findNodeById(dropZoneInfo.nodeId));
  }

  private findAddIndex(
    dropZoneInfo: DropZoneInfo,
    insertIntoNode: NgcxTreeNodeWrapper<NgcxTreeNode> | undefined,
    insertIntoList: NgcxTreeNodeWrapper<NgcxTreeNode>[]
  ) {
    if (
      insertIntoNode &&
      dropZoneInfo.dropType === DropType.DROP_INTO &&
      !insertIntoNode.data.children
    ) {
      insertIntoNode.data.children = [];
    }
    let addAtNodeIdx = 0;
    if (
      dropZoneInfo.dropType === DropType.DROP_AFTER ||
      dropZoneInfo.dropType === DropType.DROP_BEFORE
    ) {
      addAtNodeIdx = insertIntoList.findIndex(
        (child) => child.id === dropZoneInfo.nodeId
      );
      if (dropZoneInfo.dropType === DropType.DROP_AFTER) {
        addAtNodeIdx++;
      }
    }
    return addAtNodeIdx;
  }

  private removeElementFromPreviousPosition(
    movedNode: NgcxTreeNodeWrapper<NgcxTreeNode>
  ): number {
    const removeFromList = movedNode.parent?.data.children ?? this.nodes!;
    const removeIndex = removeFromList.findIndex(
      (child: any) => child.id === movedNode.id
    );
    removeFromList.splice(removeIndex, 1);
    return removeIndex;
  }

  nodeClicked(nodeWrapper: NgcxTreeNodeWrapper<NgcxTreeNode>) {
    this.clickEvent.emit(nodeWrapper);

    if (nodeWrapper.isSelectable) {
      this.selectedNode =
        nodeWrapper.id === this.selectedNode?.id ? undefined : nodeWrapper;
      this.selectEvent.emit(this.selectedNode);
    }

    if (this.treeControl.isExpanded(nodeWrapper)) {
      this.treeControl.collapse(nodeWrapper);

      nodeWrapper.children.forEach((item) => {
        this.treeControl.collapse(item);
      });
    } else {
      this.treeControl.expand(nodeWrapper);
    }
  }

  selectNode(nodeWrapper: NgcxTreeNodeWrapper<NgcxTreeNode> | undefined) {
    if (!nodeWrapper || nodeWrapper.isSelectable) {
      this.selectedNode = nodeWrapper;
      let expandNode = this.selectedNode?.parent;
      while (expandNode) {
        this.treeControl.expand(expandNode);
        expandNode = expandNode.parent;
      }
      this.selectEvent.emit(this.selectedNode);
    }
  }
}

enum DropType {
  DROP_AFTER = 'DROP_AFTER',
  DROP_BEFORE = 'DROP_BEFORE',
  DROP_INTO = 'DROP_INTO',
}

export class NgcxTreeControl extends NestedTreeControl<
  NgcxTreeNodeWrapper<NgcxTreeNode>,
  string
> {
  constructor(
    private treeComponent: FileTreeBaseComponent,
    getChildren: (
      dataNode: NgcxTreeNodeWrapper<NgcxTreeNode>
    ) => NgcxTreeNodeWrapper<NgcxTreeNode>[],
    options?: NestedTreeControlOptions<
      NgcxTreeNodeWrapper<NgcxTreeNode>,
      string
    >
  ) {
    super(getChildren, options);
  }

  /**
   * select a node by id. the selectEvent is fired afterwards.
   */
  selectNodeById(id: string) {
    this.treeComponent.selectNode(this.findNodeById(id));
  }

  /**
   * find a node by id.
   */
  findNodeById(id: string): NgcxTreeNodeWrapper<NgcxTreeNode> | undefined {
    return this.findNodeByIdInNodes(
      this.treeComponent.dataSource.data$.value,
      id
    );
  }

  private findNodeByIdInNodes(
    nodes: NgcxTreeNodeWrapper<NgcxTreeNode>[],
    id: string
  ): NgcxTreeNodeWrapper<NgcxTreeNode> | undefined {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.children?.length > 0) {
        const foundNode = this.findNodeByIdInNodes(node.children, id);
        if (foundNode) {
          return foundNode;
        }
      }
    }

    return undefined;
  }
}

class DropZoneInfo {
  dropType: DropType;
  nodeId: string;

  constructor(id: string) {
    const pos = id.indexOf('_');
    this.nodeId = id.substring(0, pos);
    this.dropType = <DropType>id.substring(pos + 1);
  }
}

class DropControl {
  constructor(
    public hideDrop: boolean,
    public preventDrop: boolean,
    public preventDropReason: string = ''
  ) {}
}

export class NgcxTreeDataSource<NgcxTreeNode> extends DataSource<NgcxTreeNode> {
  data$: BehaviorSubject<NgcxTreeNode[]>;

  constructor(data: NgcxTreeNode[]) {
    super();
    console.log(data);
    this.data$ = new BehaviorSubject(data);
  }

  connect(): Observable<readonly NgcxTreeNode[]> {
    return this.data$.asObservable();
  }
  disconnect(): void {}

  update(data: NgcxTreeNode[]) {
    this.data$.next([...data]);
  }
}
