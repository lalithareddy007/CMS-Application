import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-app';
  sidebarOpen = true;

  toggleSidebar(){
  this.sidebarOpen = this.sidebarOpen? false:true;

  // constructor(private _dialog:MatDialog) {}

  // openAddEditProgramForm(){
  //   this._dialog.open(EmpAddEditComponent);
  // }

}
}

