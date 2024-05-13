import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Program } from 'src/app/models/program';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  programDetails!: Program;
  programId: number;

  private destroy$ : Subject<void> = new Subject<void>();

  constructor(private programsService: ProgramsService,
    private matSnackBar: MatSnackBar,
    private router: ActivatedRoute ){

      this.programId = parseInt(this.router.snapshot.paramMap.get("id") || '');

    this.programsService.getPragramById(this.programId)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: Program)=> {
      this.showSuccessMessage("Program Loaded Successfully");
      this.programDetails = data;
    })
  }

  showSuccessMessage(message: string){
    this.matSnackBar.open(message, 'Close',{
      duration: 3000
    })
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

}
