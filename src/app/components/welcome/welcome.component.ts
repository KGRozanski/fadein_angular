import { Component, OnInit } from '@angular/core';
import { MaterialsImportsModule } from '../../shared/materials-imports.module';
import { MatButtonModule } from '@angular/material';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
