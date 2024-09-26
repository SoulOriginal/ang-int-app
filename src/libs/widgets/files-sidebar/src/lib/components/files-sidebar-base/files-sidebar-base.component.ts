import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, filter, take } from 'rxjs';
import { NgcxTreeNode, NgcxTreeNodeWrapper } from '../../models';
import { CreationItemsService } from '../../services';

@Component({
  selector: 'apps-files-sidebar-base',
  standalone: true,
  template: '',
})
export class FilesSidebarBaseComponent implements OnInit {
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
              faIcon: 'folder',
              children: [
                {
                  id: 'folder12231',
                  title: 'Folder 12123',
                  faIcon: 'folder',
                  children: [
                    {
                      id: 'png_file2',
                      title: 'PNG Fil2e',
                      faIcon: 'description',
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
          faIcon: 'description',
        },
        {
          id: 'png_file',
          title: 'PNG File',
          faIcon: 'description',
        },
      ],
    },
    {
      id: 'fold1er2',
      title: 'Folder 2',
      children: [],
    },
    {
      id: 'folde123r2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'folde123r2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'folde123r2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'fold123er2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'folde123123r2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'folde123123r2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'fol123123der2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'folder1231232',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'folde123123r2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'folder1231232',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'folde123123r2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'fo123lder2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'f123older2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'fold123dfer2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'foldesdfr2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'foldesdfr2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
    {
      id: 'folderasdf2',
      title: 'Folder 2',
      faIcon: 'folder',
      children: [],
    },
  ];

  config = {
    allowSelection: () => true,
  };

  ngOnInit(): void {
    // const getBaseWraps = this._creationItemsService.createWrapperNodes(this.nodes)
    // const anyy = getBaseWraps.map((node) => {
    //   return {
    //     id: 'null',
    //     title: 'null',
    //     children: [],
    //   }
    // }
    // this.selctedNodes$.next(anyy);
  }

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
