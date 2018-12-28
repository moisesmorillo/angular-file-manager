import { Component } from '@angular/core';

interface FileNode {
  name: string;
  type: string;
}

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent {
  dataSource: Array<FileNode>;
  constructor() {}

  cleanData() {
    this.dataSource = [];
  }

  handleEvent(data) {
    this.cleanData();
    if (Array.isArray(data)) {
      data.forEach(element => {
        this.dataSource.push({
          name: element.filename,
          type:
            (element.children && element.children.length > 1) ||
            element.expandable
              ? 'folder'
              : 'file'
        });
      });
    }
  }
}
