import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


const modules = [
    AppRoutingModule,
    ReactiveFormsModule
];


@NgModule({
    imports: [
        modules
    ],
    exports: [
        modules
    ]
})

export class SharedImportsModule { }