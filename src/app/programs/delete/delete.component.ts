import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, Subject } from 'rxjs';
import { ProgramsService } from 'src/app/services/programs.service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnDestroy{

programId!: number;

private destroy$: Subject<void> = new Subject<void>();

constructor(
  private router: ActivatedRoute,
  private route: Router,
  private matSnackBar: MatSnackBar,
  private programService:  ProgramsService
){
  this.programId = parseInt(this.router.snapshot.paramMap.get("id") || '');

  //Delete Functionality
  this.programService.deleteProgram(this.programId)
  .pipe(takeUntil(this.destroy$))
  .subscribe(data => {
    this.showSuccessMessage("Program Deleted Successfully");
    //alert("Program deleted");
    //console.log("Deleted the credit card");
    this.route.navigate(['programs']);
  });

}

showSuccessMessage(message: string){
  this.matSnackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'end',
    verticalPosition: 'top'
  });

}

ngOnDestroy(){
  this.destroy$.next();
  this.destroy$.complete();
}


}
