import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsapiservicesService {

  constructor(private _http:HttpClient) { }

  newsApiUrl = "https://newsapi.org/v2/top-headlines?country=mx&category=sports&apiKey=1548013162fc4839b734ccd7b331a98a";
  techAipUrl = "https://newsapi.org/v2/top-headlines?country=mx&category=technology&apiKey=1548013162fc4839b734ccd7b331a98a"; 

  topHeading():Observable<any>{
    return this._http.get(this.newsApiUrl);
  }

  techNews():Observable<any> {
    return this._http.get(this.techAipUrl);
  }
}
