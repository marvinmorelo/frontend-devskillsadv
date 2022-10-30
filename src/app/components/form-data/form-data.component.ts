import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Client } from 'src/app/interfaces/client.interface';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss']
})
export class FormDataComponent implements OnDestroy {

  @Output() clientSaved: EventEmitter<Client> = new EventEmitter();
  requests: Subscription = new Subscription();
  clientForm: FormGroup;
  showError = false;
  error: string = '';

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.clientForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      address: ['', [Validators.required, Validators.minLength(1)]],
      ssn: ['', [Validators.required, Validators.pattern('^[0-9]{3}[-][0-9]{2}[-][0-9]{4}$')]],
    });
  }

  
  saveClient() {
    this.requests = this.dataService.getToken().pipe(switchMap((resp: any) => {
      const data = {
        firstName: this.clientForm.value.firstName.trim(),
        lastName: this.clientForm.value.lastName.trim(),
        address: this.clientForm.value.address.trim(),
        ssn:  this.clientForm.value.ssn
      }
      return this.dataService.saveMember(data, resp.token);
    })).subscribe((data: any) => {
      this.clientSaved.emit(data);
      this.clientForm.reset();
    }, (error) => {
      this.error = error.error.message;
      this.showError = true;
    });
  }
  
  ngOnDestroy(): void {
    this.requests.unsubscribe()
  }

}


