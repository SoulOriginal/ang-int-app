import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgcxTreeNodeWrapper } from '../../models';

@Component({
  selector: 'apps-files-sidebar-base',
  standalone: true,
  template: '',
})
export class FilesSidebarBaseComponent {
  public selctedNodes = new BehaviorSubject<NgcxTreeNodeWrapper<any>>([);

  nodes = [
    {
      id: 'favorites',
      title: 'Favorites',
      children: [
        {
          id: 'folder1',
          title: 'Folder 1',
          faIcon: 'folder',
          children: [],
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
    {
      id: 'documents',
      title: 'Documents',
      children: [
        {
          id: 'reports',
          title: 'Reports',
          faIcon: 'fa-file-word',
          children: [
            {
              id: 'annual_report',
              title: 'Annual Report.docx',
              faIcon: 'fa-file-word',
            },
            {
              id: 'summary',
              title: 'Summary.pdf',
              faIcon: 'fa-file-pdf',
            },
          ],
        },
        {
          id: 'invoices',
          title: 'Invoices',
          faIcon: 'fa-file-invoice-dollar',
          children: [
            {
              id: 'invoice_jan',
              title: 'Invoice_Jan.pdf',
              faIcon: 'fa-file-pdf',
            },
            {
              id: 'invoice_feb',
              title: 'Invoice_Feb.pdf',
              faIcon: 'fa-file-pdf',
            },
          ],
        },
      ],
    },
    {
      id: 'pictures',
      title: 'Pictures',
      children: [
        {
          id: 'vacation',
          title: 'Vacation',
          faIcon: 'fa-folder',
          children: [
            {
              id: 'beach',
              title: 'Beach.png',
              faIcon: 'fa-file-image',
            },
            {
              id: 'mountains',
              title: 'Mountains.jpg',
              faIcon: 'fa-file-image',
            },
          ],
        },
        {
          id: 'family',
          title: 'Family',
          faIcon: 'fa-folder',
          children: [
            {
              id: 'family_photo',
              title: 'FamilyPhoto.jpg',
              faIcon: 'fa-file-image',
            },
          ],
        },
      ],
    },
    {
      id: 'videos',
      title: 'Videos',
      children: [
        {
          id: 'movies',
          title: 'Movies',
          faIcon: 'fa-film',
          children: [
            {
              id: 'movie1',
              title: 'Movie1.mp4',
              faIcon: 'fa-file-video',
            },
            {
              id: 'movie2',
              title: 'Movie2.mp4',
              faIcon: 'fa-file-video',
            },
          ],
        },
        {
          id: 'tutorials',
          title: 'Tutorials',
          faIcon: 'fa-graduation-cap',
          children: [
            {
              id: 'tutorial_js',
              title: 'JavaScript_Tutorial.mp4',
              faIcon: 'fa-file-video',
            },
            {
              id: 'tutorial_ts',
              title: 'TypeScript_Tutorial.mp4',
              faIcon: 'fa-file-video',
            },
          ],
        },
      ],
    },
    {
      id: 'music',
      title: 'Music',
      children: [
        {
          id: 'pop',
          title: 'Pop',
          faIcon: 'fa-folder',
          children: [
            {
              id: 'song1',
              title: 'Song1.mp3',
              faIcon: 'fa-file-audio',
            },
            {
              id: 'song2',
              title: 'Song2.mp3',
              faIcon: 'fa-file-audio',
            },
          ],
        },
        {
          id: 'rock',
          title: 'Rock',
          faIcon: 'fa-folder',
          children: [
            {
              id: 'rock_song1',
              title: 'Rock_Song1.mp3',
              faIcon: 'fa-file-audio',
            },
          ],
        },
      ],
    },
  ];

  config = {
    allowSelection: () => true,
  };

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  onDrop(event: CdkDragDrop<any>) {
    console.log(event);
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
    console.log(event);
  }
}
