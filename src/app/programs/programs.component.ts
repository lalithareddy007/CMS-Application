import { Component, ViewChild } from '@angular/core';
import { Program } from '../models/program';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProgramsService } from '../services/programs.service';



@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent {

  programs: Program[]= [];

  programMaxBatches: number = 0;
  totalPrograms: number = 0;

  constructor (private programsService: ProgramsService){
    this.programsService.getPrograms().subscribe((data: Program[])=>{
      this.programs = data;

      this.dataSource = new MatTableDataSource(this.programs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.calculateMetrics();

    })
  }
  dataSource = new MatTableDataSource(this.programs); 
  
  displayColumns = [ "select", "id", "name", "description", "active", "noOfBatches", "createdDate", "updatedDate","actions"];

  //dataSource = new MatTableDataSource(TABLE_DATA);

  selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  selevtHandler(row: Program){
    this.selection.toggle(row as never);
  }

  calculateMetrics(){
    this.programMaxBatches = this.programs.filter(pro => pro.noOfBatches > 10).length;
    this.totalPrograms = this.programs.length;
  }

}
