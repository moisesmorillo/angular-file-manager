import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, EventEmitter, Output } from '@angular/core';
import { FileManagerService } from '../file-manager.service';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

export class FileFlatNode {
  constructor(
    public expandable: boolean,
    public filename: string,
    public level: number,
    public type: any,
    public id: number
  ) {}
}

@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] {
    return this.dataChange.value;
  }

  constructor(private readonly service: FileManagerService) {
    this.initialize();
  }

  initialize() {
    this.service.getFileTree().subscribe(res => {
      const dataObject = res;
      const data = this.buildFileTree(dataObject, 0);
      this.dataChange.next(data);
    });
  }

  buildFileTree(obj: { [key: string]: any }, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [FileDatabase]
})
export class SidebarComponent {
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  id = 0;
  @Output() eventData = new EventEmitter<any>();

  constructor(database: FileDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    );
    this.treeControl = new FlatTreeControl<FileFlatNode>(
      this._getLevel,
      this._isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
      if (data.length > 1) {
        this.fireEvent(data, true);
      }
    });
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(
      !!node.children,
      node.filename,
      level,
      node.type,
      this.generateSecuencialId()
    );
  };

  private _getLevel = (node: FileFlatNode) => node.level;

  private _isExpandable = (node: FileFlatNode) => node.expandable;

  private _getChildren = (node: FileNode): Observable<FileNode[]> =>
    observableOf(node.children);

  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

  generateSecuencialId() {
    return (this.id += 1);
  }

  fireEvent(data, initial = false) {
    if (!initial) {
      const dict = this.dataSource._expandedData.value;
      data = dict.filter(e => e.level > data.level);
    }
    this.eventData.emit(data);
  }
}
