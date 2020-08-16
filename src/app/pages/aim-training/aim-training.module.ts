import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AimTrainingPageRoutingModule } from './aim-training-routing.module';

import { AimTrainingPage } from './aim-training.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AimTrainingPageRoutingModule
  ],
  declarations: [AimTrainingPage]
})
export class AimTrainingPageModule {}
