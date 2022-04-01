import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaCharacterCountModule } from "@gsa-sam/ngx-uswds";
import { CharacterCountBasic } from "./character-count-basic.component";


@NgModule({
  imports: [CommonModule, UsaCharacterCountModule],
  declarations: [CharacterCountBasic],
  exports: [CharacterCountBasic]
})
export class CharacterCountBasicModule {}
