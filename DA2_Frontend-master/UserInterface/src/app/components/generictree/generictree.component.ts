import { OnInit, Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Components } from 'src/app/intefaces/Components';
import { Router } from '@angular/router';
import { TreeViewComponent, DragAndDropEventArgs, NodeCheckEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Title } from '@angular/platform-browser';




@Component({
  selector: 'app-generictree',
  templateUrl: './generictree.component.html',
  styleUrls: ['./generictree.component.scss']
})

export class GenericTreeComponent implements OnInit {

  @Input() mode: string;
  @Input() componentToUpdate: number;
  @Output() onSelectValue = new EventEmitter<number>();

  @ViewChild('componentsTree', { static: true }) tree: TreeViewComponent;

  allowDragAndDrop: boolean;
  showCheckBox: boolean;
  formTitle: string = '';
  userComponents: Components;
  public treeFields: Object;
  public treeData: Object[] = [];
  errorMessage: string;
  expandedTree: boolean = false;
  parentFolderSelected: number;


  constructor(private userService: UserService, private routerService: Router, private titleService: Title) {

  }

  ngOnInit() {
    this.getAllComponents();
    this.setTitle("TwoDrive");
    this.configMode();
  }

  configMode() {
    switch (this.mode) {
      case 'AllFiles':
        this.showCheckBox = false;
        this.allowDragAndDrop = false;
        this.formTitle = 'My Files & Folders'
        break;
      case 'UpdateComponent':
        this.showCheckBox = false;
        this.allowDragAndDrop = true;
        this.formTitle = ''
        break;
      case 'InsertComponent':
        this.showCheckBox = true;
        this.allowDragAndDrop = false;
        this.formTitle = ''
        break;
      case 'DisplayComponent':
        this.showCheckBox = false;
        this.allowDragAndDrop = false;
        this.formTitle = ''
        break;
      default:

    }
  }

  getErrorMessage(error: string) {
    this.errorMessage = error;
  }

  getAllComponents(): void {
    this.userService.getAllComponents().subscribe(
      ((data: any) => this.drawTree(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  updateGenericTreeFromParent() {
    this.getAllComponents();
    this.selectComponent();
  }

  showErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  drawTree(components: Components): void {
    this.userComponents = components;
    this.treeData = [this.userComponents];
    this.treeFields = {
      dataSource: this.treeData,
      id: 'id',
      text: 'name',
      pid: 'parentID',
      iconCss: 'extension',
      child: 'directChildComponents'
    };


  }

  selectComponent() {
    if (this.mode !== "AllFiles") {
      setTimeout(() => {
        let treeInstance = this.tree;
        if (this.componentToUpdate) {
          treeInstance.selectedNodes = [this.componentToUpdate.toString()];
        }

      }, 100);
    }
  }

  onBack(): void {
    this.routerService.navigate(['/myfiles']);
  }

  expandAll() {
    this.tree.expandAll();
    this.expandedTree = true;
  }

  collapseAll() {
    this.tree.collapseAll();
    this.expandedTree = false;
  }

  setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  onNodeDrag(args: DragAndDropEventArgs): void {
    if (args.droppedNode.getElementsByClassName('none').length === 0) args.dropIndicator = 'e-no-drop';
    if (args.draggedNodeData.id == null) args.dropIndicator = 'e-no-drop';
    if (args.draggedNodeData.id !== this.componentToUpdate) args.dropIndicator = 'e-no-drop';
    if (args.draggedNodeData.id !== this.componentToUpdate) args.dropIndicator = 'e-no-drop';
    if (!args.draggedNodeData.parentID) args.cancel = true;
  }

  onDragStop(args: DragAndDropEventArgs): void {
    if (args.droppedNode.getElementsByClassName('none').length === 0) args.cancel = true;
    if (args.draggedNodeData.id !== this.componentToUpdate) args.cancel = true;
    if (args.draggedNodeData.id == null) args.cancel = true;
    this.onSelectValue.emit(this.parentFolderSelected);
  }

  onNodeDragging(args: DragAndDropEventArgs): void {
    this.parentFolderSelected = Number(args.droppedNodeData.id.toString());
  }

  onNodeChecking(args: NodeCheckEventArgs) {
    this.parentFolderSelected = Number(args.data[0].id.toString());
    if (this.tree.checkedNodes.length > 0 && !this.tree.checkedNodes.includes(this.parentFolderSelected.toString())) {
      args.cancel = true;
    }
    this.onSelectValue.emit(this.parentFolderSelected);
  }
}








