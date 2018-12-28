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
  initial = false;
  dataSource: Array<FileNode>;
  constructor() {}

  cleanData() {
    this.dataSource = [];
    this.initial = false;
  }

  handleEvent(data) {
    this.cleanData();
    this.initial = data.initial;
    if (Array.isArray(data.data)) {
      data.data.forEach(element => {
        this.dataSource.push({
          name: element.filename,
          type: element.children.length > 1 ? 'folder' : 'file'
        });
      });
    }
    console.log(this.dataSource);
  }
}
