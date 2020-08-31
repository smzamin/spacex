import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private getData: BehaviorSubject<object> = new BehaviorSubject({});
  getSpaceXData = this.getData.asObservable();
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getLaunchData(data) {
    return this.http.get(`${this.apiUrl}` + data);
  }

  loadLaunchData(data) {
    this.getData.next(data);
  }

}
