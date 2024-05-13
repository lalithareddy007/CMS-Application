import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Program } from 'src/app/models/program';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  
  editProgramForm!: FormGroup;
  // editProgramForm: FormGroup | undefined;

  programId: number = 0;

  programData: Program | null = null;

  private destroy$ : Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private programsService: ProgramsService){

      this.editProgramForm = this.formBuilder.group({
        id: [this.programId],
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        description: ['', Validators.required],
        active: [false, Validators.required],
        noOfBatches: [null, Validators.required],
        createdDate: ['', Validators.required],
        updatedDate: ['', Validators.required]
      });
    }

    ngOnInit(){
      const id = parseInt(this.route.snapshot.paramMap.get("id") || '');

      if(id !== 0){
        this.programsService.getPragramById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.programData = data;

          this.editProgramForm.patchValue(this.programData);
        })
      }
    }

    onSubmit(){
      if(this.editProgramForm.valid){
        const updatedFormData: Program = this.editProgramForm.value;
       // console.log(updatedFormData);
        this.programsService.updateProgram(updatedFormData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.showSuccessMessage("Program Updated Successfully");
        })

      }
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
