import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AimTrainingPage } from './aim-training.page';

const routes: Routes = [
  {
    path: '',
    component: AimTrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AimTrainingPageRoutingModule {}
