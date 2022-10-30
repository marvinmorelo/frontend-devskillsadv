import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { switchMap } from 'rxjs/operators';
import { Client } from 'src/app/interfaces/client.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  requests: Subscription = new Subscription();
  clients: Client[] = [];
  interval: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getData();
    this.interval = setInterval(this.getData.bind(this), 120000);
  }

  getData() {
    this.dataService.getToken().pipe(switchMap((resp: any) => {
      return this.dataService.getMembers(resp.token);
    })).subscribe((data: any) => {
      this.clients = data;
    });
  }

  updateData(event: Client) {
    this.clients.push(event);
    this.resetInterval();
  }

  trackByItems(index: number, item: Client) {
    return item?.ssn;
  }

  resetInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(this.getData.bind(this), 120000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.requests.unsubscribe();
  }

}
