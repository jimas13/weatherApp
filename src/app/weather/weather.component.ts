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
  // setVariables(temp: {}):void{
  //   for(let key in temp){
  //     if(key=='name')
  //       this.name=temp[key];
  //     else if(key=='main'){
  //       for(let ky in temp[key])
  //         if(ky=='temp')
  //           this.temp=temp[key][ky];
  //     }
  //     else if(key=='weather'){
  //       for(let i=0;i<1;i++)
  //         for(let ky in temp[key][i])
  //           if(ky=='description')
  //             this.description=temp[key][ky]
  //     }
  //   }
  //   this.name=temp[10];
  //   this.temp=temp[3].temp;
  //   this.pressure=temp[3].pressure;
  //   this.country=temp[8].country;
  //   this.description=temp[1].description;
  //   this.icon=temp[1].icon;
  //}
  ngOnInit() {

    this._locationService.fetchTemp().subscribe(temp => {
      for(let key in temp){
        if(temp.hasOwnProperty(key)){
        //   if(key=='name' || key=='temp' || key=='country' || key=='description' || key=='icon')
            this.temperature.push(temp[key]);
        }
       }
      //this.temperature=temp;
       //console.log(Object.getOwnPropertyNames(temp));
       //console.log(Object.keys(temp));
       //this.temperature=temp;
       //console.log(this.temperature);
      
       //  for(let key in this.temperature){
      //    console.log(this.temperature[key]);
      //  }

       //this.temperature.forEach(each => console.log(typeof each));
      
        this.temperature.forEach( eachObj=>{
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
    },
  err => console.log(err));
    //this.setVariables(this.temperature);
    // this.weather.name=this.temperature[10];
    // this.weather.main=this.temperature[3];
    // this.weather.sys=this.temperature[8];
    // this.weather.weather=this.temperature[1];
  }
}
