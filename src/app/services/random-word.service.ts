import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomWordService {
  url = 'assets/data/words.json';

  constructor(private http: HttpClient) { }

  getRandom(): Observable<any> {
    return this.http.get(this.url);
  }
}
