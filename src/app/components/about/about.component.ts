import { Component, OnInit } from '@angular/core';
import { MaterialsImportsModule } from '../../../modules/materials-imports.module';
import { MatButtonModule } from '@angular/material';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
