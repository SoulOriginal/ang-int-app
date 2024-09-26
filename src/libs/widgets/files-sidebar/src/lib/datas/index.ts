import { NgcxTreeNode } from '../models';

export const tree: NgcxTreeNode[] = [
  {
    id: '1',
    title: 'Documents',
    children: [
      {
        id: '1.1',
        title: 'Reports',
        faIcon: 'folder_open',
        children: [
          {
            id: '1.1.1',
            title: 'January Report.pdf',
            faIcon: 'description',
          },
          {
            id: '1.1.2',
            title: 'February Report.pdf',
            faIcon: 'description',
          },
          {
            id: '1.1.3',
            title: 'Q1 Overview.docx',
            faIcon: 'description',
          },
        ],
      },
      {
        id: '1.2',
        title: 'Project Plan',
        faIcon: 'folder',
        children: [
          {
            id: '1.2.1',
            title: 'Plan_v1.docx',
            faIcon: 'description',
          },
          {
            id: '1.2.2',
            title: 'Tasks.png',
            faIcon: 'task',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Media',
    children: [
      {
        id: '2.1',
        title: 'Photos',
        faIcon: 'folder_shared',
        children: [
          {
            id: '2.1.1',
            title: 'Vacation.png',
            faIcon: 'image',
          },
          {
            id: '2.1.2',
            title: 'Family.png',
            faIcon: 'image',
          },
        ],
      },
      {
        id: '2.2',
        title: 'Archives',
        faIcon: 'folder_zip',
        children: [
          {
            id: '2.2.1',
            title: '2021.zip',
            faIcon: 'file_present',
          },
          {
            id: '2.2.2',
            title: '2022.zip',
            faIcon: 'file_present',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Work',
    children: [
      {
        id: '3.1',
        title: 'Projects',
        faIcon: 'rule_folder',
        children: [
          {
            id: '3.1.1',
            title: 'Project_A',
            children: [
              {
                id: '3.1.1.1',
                title: 'Design.png',
                faIcon: 'image',
              },
              {
                id: '3.1.1.2',
                title: 'Specification.pdf',
                faIcon: 'description',
              },
            ],
          },
          {
            id: '3.1.2',
            title: 'Project_B',
            children: [
              {
                id: '3.1.2.1',
                title: 'Summary.pdf',
                faIcon: 'description',
              },
              {
                id: '3.1.2.2',
                title: 'Presentation.pptx',
                faIcon: 'file_present',
              },
            ],
          },
        ],
      },
    ],
  },
];
