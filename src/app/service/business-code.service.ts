import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessCodeService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  hardCodedBusinessCodeOptions = [
    'NA',
    'K73.1/8731',
    'K74.14/8742',
    'DL33.10/3841',
    'DL33.10/3842',
    'DL33.10/3843',
    'DL3310/3845'
  ];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getBusinessCodes(): Observable<string[]> {
    return of(this.hardCodedBusinessCodeOptions);
  };
}
