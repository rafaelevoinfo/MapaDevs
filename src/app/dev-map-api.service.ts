import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Dev } from './shared/dev.model';

@Injectable({
  providedIn: 'root'
})
export class DevMapApiService {
  // Back-end do Lucas
  //"https://arcane-depths-49398.herokuapp.com"; 
  readonly baseUrl: string = "http://ec2-18-217-217-129.us-east-2.compute.amazonaws.com:3333";
  httpHeaders: HttpHeaders;
  devs:Dev[];

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
  }

  salvar(ipDev: Dev): Observable<Dev> {
    return this.http.post<any>(`${this.baseUrl}/devs`,
      ipDev,
      { headers: this.httpHeaders })
      .pipe(map(
        ipData => {
          return this.criarDev(ipData)
        }
      )
      );
  }

  private criarDev(ipData) {
    const { github_username, techs, name, avatar_url, bio, location: { coordinates: [longitude, latitude] } } = ipData;
    let vaTechs = techs ? techs.toString() : '';
    return new Dev(github_username, vaTechs, latitude, longitude, name, avatar_url, bio);
  }

  getDevs(): Observable<Dev[]> {
    return this.http.get<any[]>(`${this.baseUrl}/devs`,
      { headers: this.httpHeaders })
      .pipe(map(
        ipData => {
          let vaDevs: Dev[] = [];
          for (let vaData of ipData) {
            vaDevs.push(this.criarDev(vaData));
          }
          return vaDevs;
        }
      )
      );
  }
}
