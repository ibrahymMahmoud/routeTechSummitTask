import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  headers = new HttpHeaders({
    'X-MASTER-KEY': '$2a$10$NzUuSPrfdNB2tCLGPav4EurGYd8VMCFUnSH50ubEKIQOK00tX9UoC',
    'X-ACCESS-KEY': '$2a$10$fiuwLMEjsY0RO0hGZ/oht.YG7I4PtYGRufjb9WcoXAIo7eEx/5AVq',
  });


  constructor( private _HttpClient:HttpClient ) { }
  
  TestHostApi():Observable<any>{
    return this._HttpClient.get('https://api.jsonbin.io/v3/b/66950525ad19ca34f887ee74', { headers: this.headers });
  }
}
