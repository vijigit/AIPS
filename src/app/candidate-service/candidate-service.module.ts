import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CandidateServiceModule {

  private candidateName: string;

  public getcandidateName(): string {
    return this.candidateName;
  }
  public setcandidateName(value: string) {
    this.candidateName = value;
  }


 }
