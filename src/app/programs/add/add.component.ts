import { Component } from '@angular/core';
import { Program } from 'src/app/models/program';
import { ProgramsService } from 'src/app/services/programs.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  private subscription: Subscription | undefined;

  constructor(private programsService:ProgramsService,
    private router:Router) {

  }

  newProgram: Program = {
    id: undefined,
    name: "",
    description: "",
    active: true,
    noOfBatches: 0,
    createdDate: Date(),
    updatedDate: Date()
  }

  saveProgram(){
    console.log("Form Submitted");
    this.subscription = this.programsService.createProgram(this.newProgram).subscribe(data => {
      alert("Program created");
      this.router.navigate(['programs']);
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
