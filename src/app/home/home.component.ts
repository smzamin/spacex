import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


// tslint:disable: forin
// tslint:disable: typedef

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  unsubscribe = new Subject();
  launchYear; contentData;

  constructor(
    private dataService: DataService,
  ) { }

  getLaunchData() {
    this.dataService.getLaunchData('limit=100').pipe(takeUntil(this.unsubscribe)).subscribe((getData: any) => {
      console.log(getData);

      this.contentData = getData;

      const launchYears = [];
      getData.forEach(element => {
        launchYears.push(element.launch_year);
      });
      this.launchYear = this.removeDuplicates(launchYears);

    });
  }

  filterYear(data) {
    this.dataService.getLaunchData('limit=100&launch_year=' + data)
    .pipe(takeUntil(this.unsubscribe)).subscribe((getData: any) => {
      this.contentData = getData;
    });
  }

  filterLaunch(data) {
    this.dataService.getLaunchData('limit=100&launch_success=' + data).pipe(takeUntil(this.unsubscribe)).subscribe((getData: any) => {
      this.contentData = getData;
    });
  }

  successfullLand(data) {
    this.dataService.getLaunchData('limit=100&launch_success=true&land_success=' + data).pipe(takeUntil(this.unsubscribe))
    .subscribe((getData: any) => {
      this.contentData = getData;
    });
  }

  removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b);
  }

  ngOnInit() {
    this.getLaunchData();
  }

}
