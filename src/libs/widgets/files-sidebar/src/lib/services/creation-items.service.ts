import { Injectable } from '@angular/core';
import { NgcxTreeNode } from '../models';

@Injectable()
export class CreationItemsService {
  // Метод для создания новых папок
  createFolders(count: number): NgcxTreeNode[] {
    const folders: NgcxTreeNode[] = [];
    for (let i = 0; i < count; i++) {
      const folder: NgcxTreeNode = {
        id: this.generateId(),
        title: `Folder ${i + 1}`,
        faIcon: 'folder',
        children: [],
      };
      folders.push(folder);
    }
    return folders;
  }

  // Метод для создания новых файлов
  createFiles(count: number): NgcxTreeNode[] {
    const files: NgcxTreeNode[] = [];
    const fileTypes = ['pdf', 'png'];
    for (let i = 0; i < count; i++) {
      const isPdf = Math.random() > 0.5;
      const fileType = fileTypes[isPdf ? 0 : 1];
      const file: NgcxTreeNode = {
        id: this.generateId(),
        title: `File ${i + 1}.${fileType}`,
        faIcon: isPdf ? 'fa-file-pdf' : 'fa-file-image',
      };
      files.push(file);
    }
    return files;
  }

  // Добавление элементов в ноду дерева
  addItemsToNode(
    nodes: NgcxTreeNode[],
    selectedNodeId: string,
    items: NgcxTreeNode[]
  ): NgcxTreeNode[] {
    // Рекурсивно ищем ноду, обновляем ее и возвращаем новое дерево
    return nodes.map((node) => {
      if (node.id === selectedNodeId) {
        // Если это выбранная нода, добавляем элементы
        if (!node.children) {
          node.children = [];
        }
        node.children.push(...items);
        return { ...node }; // Возвращаем обновленный узел
      } else if (node.children) {
        // Рекурсивно ищем в дочерних элементах
        return {
          ...node,
          children: this.addItemsToNode(node.children, selectedNodeId, items),
        };
      } else {
        return node; // Если это не целевая нода, возвращаем её без изменений
      }
    });
  }

  // Метод для генерации уникальных ID
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
