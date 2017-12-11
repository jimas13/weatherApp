import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { TemplateRef } from '@angular/core/src/linker/template_ref';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { error } from 'selenium-webdriver';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  temperature:JSON;
  constructor(private _locationService:LocationService) { }

  ngOnInit() {
    this._locationService.fetchTemp()
    .subscribe(temp => {
      this.temperature = temp;
    },
    err=> console.log(err));
  }
}
