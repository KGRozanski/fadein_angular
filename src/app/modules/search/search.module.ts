import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsImportsModule } from '../../shared/modules/materials-imports.module';
import { SharedImportsModule } from 'src/app/shared/modules/shared-imports.module';
import { SearchComponent } from '../search/search/search.component';
import { FilterPipe } from '../../core/pipes/filter.pipe';

@NgModule({
  declarations: [
    SearchComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SharedImportsModule,
    MaterialsImportsModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
