import { Injectable } from '@angular/core';
import { NgcxTreeNode, NgcxTreeNodeWrapper } from '../models';

@Injectable()
export class CreationItemsService {
  createFolders(count: number): NgcxTreeNode[] {
    const folders: NgcxTreeNode[] = [];
    for (let i = 0; i < count; i++) {
      const folder: NgcxTreeNode = {
        id: this.generateId(),
        title: `Folder Untitled ${i + 1}`,
        faIcon: 'folder',
        children: [],
      };
      folders.push(folder);
    }
    return folders;
  }

  createFiles(count: number): NgcxTreeNode[] {
    const files: NgcxTreeNode[] = [];
    const fileTypes = ['pdf', 'png'];
    for (let i = 0; i < count; i++) {
      const isPdf = Math.random() > 0.5;
      const fileType = fileTypes[isPdf ? 0 : 1];
      const file: NgcxTreeNode = {
        id: this.generateId(),
        title: `Untitled ${i + 1}.${fileType}`,
        faIcon: isPdf ? 'description' : 'image',
      };
      files.push(file);
    }
    return files;
  }

  addItemsToNode(nodes: NgcxTreeNode[], selectedNodeId: string, items: NgcxTreeNode[]): NgcxTreeNode[] {
    return nodes.map((node) => {
      if (node.id === selectedNodeId) {
        if (!node.children) {
          node.children = [];
        }
        node.children.push(...items);
        return { ...node };
      } else if (node.children) {
        return {
          ...node,
          children: this.addItemsToNode(node.children, selectedNodeId, items),
        };
      } else {
        return node;
      }
    });
  }

  createWrapperNodes(nodes: NgcxTreeNode[], isSelectable: boolean = true, parent?: NgcxTreeNodeWrapper, depth: number = 0): NgcxTreeNodeWrapper[] {
    const childCount = nodes.length;
    const wrapperNodes = nodes.map((node, idx) => {
      const nodeWrapper: NgcxTreeNodeWrapper = {
        id: node.id,
        data: <NgcxTreeNode>node,
        isFirstChild: idx === 0,
        isLastChild: idx === childCount - 1,
        isSelectable,
        index: idx,
        parent: parent,
        depth: depth,
        children: [],
      };
      nodeWrapper.children = node.children ? this.createWrapperNodes(node.children, isSelectable, nodeWrapper, depth + 1) : [];

      return nodeWrapper;
    });
    wrapperNodes.forEach((wrapperNode) => {
      if (!wrapperNode.isLastChild) {
        wrapperNode.next = wrapperNodes[wrapperNode.index + 1];
      }
      if (!wrapperNode.isFirstChild) {
        wrapperNode.previous = wrapperNodes[wrapperNode.index - 1];
      }
      wrapperNode.isSelectable = isSelectable;
    });
    return wrapperNodes;
  }

  updateNodeProperties(nodes: NgcxTreeNode[], nodeId: string, newTitle: string, newFaIcon?: string): NgcxTreeNode[] {
    console.log({ newTitle, newFaIcon });

    return nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          title: newTitle,
          faIcon: newFaIcon,
        };
      } else if (node.children) {
        return {
          ...node,
          children: this.updateNodeProperties(node.children, nodeId, newTitle, newFaIcon),
        };
      } else {
        return node;
      }
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
