import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterCountBasicComponent } from './character-count-basic.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsaCharacterCountModule } from 'uswds-components';



@NgModule({
  declarations: [CharacterCountBasicComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsaCharacterCountModule
  ],
  exports: [CharacterCountBasicComponent]
})
export class CharacterCountBasicModule { }
