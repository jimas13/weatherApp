import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/observable/of';
import { IWeather } from './weather';

@Injectable()
export class LocationService {
  constructor (
    private _http: HttpClient
  ) { }

  public fetchTemp(): Observable<any> {
    return Observable.fromPromise(this.getQueryString()).mergeMap(queryString => {
      return this._http.get(queryString);
    });
  }

  private getQueryString(): Promise<string> {
    return this.getPosition().then(p => {
      return this.createQueryString(p.coords.latitude, p.coords.longitude);
    });
  }

  private createQueryString(lat, lon): string {
    return `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
  }

  private getPosition(): Promise<any> {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }


}
