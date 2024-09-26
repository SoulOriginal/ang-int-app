import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, filter, take } from 'rxjs';
import { NgcxTreeNode, NgcxTreeNodeWrapper } from '../../models';
import { CreationItemsService } from '../../services';

@Component({
  selector: 'apps-files-sidebar-base',
  standalone: true,
  template: '',
})
export class FilesSidebarBaseComponent {
  private selctedNodes$ = new BehaviorSubject<NgcxTreeNodeWrapper | null>(null);
  public selctedNodes = this.selctedNodes$.pipe(filter(Boolean));

  private _creationItemsService = inject(CreationItemsService);

  public nodes: NgcxTreeNode[] = [
    {
      id: 'favorites',
      title: 'Favorites',
      children: [
        {
          id: 'folder1',
          title: 'Folder 1',
          faIcon: 'folder',
          children: [
            {
              id: 'folder1231',
              title: 'Folder 1213',
              faIcon: 'folder2',
              children: [
                {
                  id: 'folder12231',
                  title: 'Folder 12123',
                  faIcon: 'folder22',
                  children: [
                    {
                      id: 'png_file2',
                      title: 'PNG Fil2e',
                      faIcon: 'fa-file-image',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'folder2',
          title: 'Folder 2',
          faIcon: 'folder',
          children: [],
        },
        {
          id: 'pdf_file',
          title: 'PDF File',
          faIcon: 'fa-file-pdf',
        },
        {
          id: 'png_file',
          title: 'PNG File',
          faIcon: 'fa-file-image',
        },
      ],
    },
  ];

  config = {
    allowSelection: () => true,
  };

  onDrop(event: CdkDragDrop<any>) {
    console.log({ event });
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // } else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // }
  }
  onSelect(event: any) {
    console.log({ event });
    this.selctedNodes$.next(event);
  }

  public handleCreateFolders() {
    // TODO destroy
    this.selctedNodes.pipe(take(1)).subscribe((selectedNode) => {
      if (selectedNode) {
        const newFolders = this._creationItemsService.createFolders(50);
        this.nodes = this._creationItemsService.addItemsToNode(this.nodes, selectedNode.id, newFolders);
      }
    });
  }
  public handleCreateFiles() {
    // TODO destroy
    this.selctedNodes.pipe(take(1)).subscribe((selectedNode) => {
      if (selectedNode) {
        const newFiles = this._creationItemsService.createFiles(50);
        this.nodes = this._creationItemsService.addItemsToNode(this.nodes, selectedNode.id, newFiles);
      }
    });
  }
}
