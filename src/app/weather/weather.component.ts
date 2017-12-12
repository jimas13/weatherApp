import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { TemplateRef } from '@angular/core/src/linker/template_ref';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { error } from 'selenium-webdriver';
import { IWeather } from '../weather';
import { isString } from 'util';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  temperature=[];
  weather: IWeather;
  name: string;
  temp: number;
  humidity: number;
  description: string;
  icon: string;
  country: string;
  
  constructor(private _locationService:LocationService) { }
  
  setVariables(temp:any[]):void{
    temp.forEach( eachObj=>{
      if(eachObj instanceof Object){
       for (let key in eachObj) {
         // if (key=='temp' || key=='humidity' || key=='country'){
         //    console.log(key,eachObj[key], typeof eachObj[key]);
         //    this.[key]=eachObj[key];
         // }
         if (key=='temp')
           this.temp=eachObj[key];
         else if(key=='humidity')
           this.humidity=eachObj[key];
         else if(key=='country')
           this.country=eachObj[key];
       }
     }
     if(eachObj instanceof Array)
       eachObj.forEach(Obj => {
         if(Obj instanceof Object)
           for(let key in Obj){
             if(key=='description')
               this.description=Obj[key];
             else if(key=='icon')
               this.icon=Obj[key];
           }
       })
     if((typeof eachObj)=='string'){
       this.name=eachObj;
     }
   });
  }

  ngOnInit() {

    this._locationService.fetchTemp().subscribe(temp => {
      for(let key in temp){
        if(temp.hasOwnProperty(key)){
        //   if(key=='name' || key=='temp' || key=='country' || key=='description' || key=='icon')
            this.temperature.push(temp[key]);
        }
       }
       this.setVariables(this.temperature);
       console.log(this.temperature);
      //this.temperature=temp;
       //console.log(Object.getOwnPropertyNames(temp));
       //console.log(Object.keys(temp));
       //this.temperature=temp;
       //console.log(this.temperature);
      
       //  for(let key in this.temperature){
      //    console.log(this.temperature[key]);
      //  }

       //this.temperature.forEach(each => console.log(typeof each));
    },
  err => console.log(err));
  }
}
