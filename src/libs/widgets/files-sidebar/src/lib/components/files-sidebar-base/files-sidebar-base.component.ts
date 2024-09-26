import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FileDialogService } from '@apps/libs-features-file-dialog';
import { BehaviorSubject, combineLatest, filter, map, merge, switchMap, take, takeUntil, tap } from 'rxjs';
import { tree } from '../../datas';
import { NgcxTreeNode, NgcxTreeNodeWrapper } from '../../models';
import { CreationItemsService } from '../../services';

@Component({
  selector: 'apps-files-sidebar-base',
  standalone: true,
  template: '',
})
export class FilesSidebarBaseComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private _creationItemsService = inject(CreationItemsService);
  private _fileDialogService = inject(FileDialogService);

  private selctedNodes = new BehaviorSubject<NgcxTreeNodeWrapper | null>(null);
  public selctedNodes$ = this.selctedNodes.pipe(filter(Boolean));

  private selctedNode = new BehaviorSubject<NgcxTreeNodeWrapper | null>(null);
  public selctedNode$ = this.selctedNode.pipe(filter(Boolean));

  private nodes = new BehaviorSubject<NgcxTreeNode[]>([]);
  public nodes$ = this.nodes.pipe(filter(Boolean));

  config = {
    allowSelection: () => true,
  };

  ngOnInit(): void {
    this.nodes.next(tree);

    const getInitialTreeView: NgcxTreeNodeWrapper = {
      id: 'bla-bla-bla',
      title: 'View All Objects',
      isFirstChild: false,
      isSelectable: false,
      isLastChild: false,
      data: {
        id: 'bla-bla-bla',
        title: 'View All Objects',
        children: [],
      },
      index: -1,
      depth: 0,
      children: this._creationItemsService.createWrapperNodes(tree, false),
    };

    this.selctedNodes.next(getInitialTreeView);

    this.selctedNode$
      .pipe(
        switchMap((selectedNode) => {
          const dialogRef = this._fileDialogService.openDialog('lg');
          dialogRef.componentInstance.title = selectedNode.data.title;
          dialogRef.componentInstance.icon = selectedNode?.data?.faIcon ?? null;

          return merge(
            dialogRef.componentInstance.openEvent.pipe(
              take(1),
              tap(() => {
                this.onSelect(selectedNode);
                dialogRef.close();
              })
            ),
            dialogRef.componentInstance.updateTitle.pipe(
              switchMap((title) => {
                return combineLatest([this.selctedNode$.pipe(take(1)), this.nodes$.pipe(take(1))]).pipe(map(([selectedNode, nodes]) => ({ title, selectedNode, nodes })));
              }),
              tap(({ title, selectedNode, nodes }) => {
                console.log(title, selectedNode);
                this.nodes.next(this._creationItemsService.updateNodeProperties(nodes, selectedNode.id, title, selectedNode?.data?.faIcon));
                // dialogRef.close();
              })
            ),
            dialogRef.componentInstance.updateIcon.pipe(
              switchMap((icon) => {
                return combineLatest([this.selctedNode$.pipe(take(1)), this.nodes$.pipe(take(1))]).pipe(map(([selectedNode, nodes]) => ({ icon, selectedNode, nodes })));
              }),
              tap(({ icon, selectedNode, nodes }) => {
                this.nodes.next(this._creationItemsService.updateNodeProperties(nodes, selectedNode.id, selectedNode.data.title, icon));
                dialogRef.close();
              })
            )
          ).pipe(takeUntil(dialogRef.afterClosed()));
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  onSelect(event: any) {
    this.selctedNodes.next(event);
  }

  handleClickNode(node: NgcxTreeNodeWrapper, isSelectable: boolean = true) {
    console.log(isSelectable);
    if (isSelectable) {
      this.selctedNode.next(node);
    }
  }
  public handleCreateFolders(count: number = 50) {
    combineLatest([this.selctedNodes$.pipe(take(1)), this.nodes$.pipe(take(1))])
      .pipe(
        map(([selectedNode, nodes]) => ({ selectedNode, nodes })),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ selectedNode, nodes }) => {
        const newFolders = this._creationItemsService.createFolders(count);
        this.nodes.next(this._creationItemsService.addItemsToNode(nodes, selectedNode.id, newFolders));
      });
  }

  public handleCreateFiles(count: number = 50) {
    combineLatest([this.selctedNodes$.pipe(take(1)), this.nodes$.pipe(take(1))])
      .pipe(
        map(([selectedNode, nodes]) => ({ selectedNode, nodes })),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ selectedNode, nodes }) => {
        const newFiles = this._creationItemsService.createFiles(count);
        this.nodes.next(this._creationItemsService.addItemsToNode(nodes, selectedNode.id, newFiles));
      });
  }
}
