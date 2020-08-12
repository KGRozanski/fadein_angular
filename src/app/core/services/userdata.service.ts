import { User } from '../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogService } from './log.service';
import { UrlService } from './url.service';
import { environment } from './../../../environments/environment';

const ORIGIN = 'http://127.0.0.1:4200';
const PROTOCOL = 'http';
const PORT = 3000;

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

    constructor(private http: HttpClient, private router: Router, private log: LogService, private url: UrlService) {}

    private user: User = <User> {};
    public userSubject = new BehaviorSubject<User>(this.user);
    public USER_STATE = this.userSubject.asObservable();

    public APIurl = `${environment.PROTOCOL}://${environment.host}:${environment.API_PORT}/api/`;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': ORIGIN
        }),
        withCredentials: true
    };
    private httpOptionsMultipart = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': ORIGIN
        }),
        withCredentials: true
    };


    makeLogin() {
        this.getUserProfile().subscribe((data) => {
            if (data.body) {
                this.user = data.body;
                this.user.avatar = `${PROTOCOL}://${window.location.hostname}:${PORT}/api/avatar`;
                this.user.bgImage = `${PROTOCOL}://${window.location.hostname}:${PORT}/api/background/` + this.user.username ;
                this.userSubject.next(this.user);
                this.router.navigate(['/']);
                this.log.log(this.user, 'table');
            }
        });
    }

    private _sendRequest(method: any, url: string, body: any, headers: object) {
        const req = new  HttpRequest(method, url, body, headers);
        return this.http.request(req);
    }

    authenticate(data): Observable<any> {
        return this._sendRequest('POST', this.APIurl + 'login', data, this.httpOptions);
    }
    getUserProfile(): Observable<any> {
        return this._sendRequest('GET', this.APIurl + 'profile', null, this.httpOptions);
    }
    getProfessions() {
        return this._sendRequest('GET', this.APIurl + 'professions', null, this.httpOptions);
    }
    registerNewUser(data): Observable<any> {
        this.httpOptions.withCredentials = false;
        return this._sendRequest('POST', this.APIurl + 'register', data, this.httpOptions);
    }
    putUserAvatar(data): Observable<any> {
        return this._sendRequest('PUT', this.APIurl + 'uploadAvatar', data, this.httpOptionsMultipart);
    }
    putPhoto(data): Observable<any> {
        return this._sendRequest('PUT', this.APIurl + 'uploadPhoto', data, this.httpOptionsMultipart);
    }
    putBackgroundPhoto(data): Observable<any> {
        return this._sendRequest('PUT', this.APIurl + 'uploadBackground', data, this.httpOptionsMultipart);
    }
    updateProfessions(data): Observable<any> {
        return this._sendRequest('POST', this.APIurl + 'updateProfessions', data, this.httpOptions);
    }
    addProduction(data): Promise<any> {
        return this._sendRequest('POST', this.APIurl + 'addProduction', data, this.httpOptions).toPromise();
    }
    search(type, phrase): Observable<any> {
        return this._sendRequest('GET', this.APIurl + 'search/' + type + '/' + phrase, null, this.httpOptions);
    }
    getPublicProfile(id): Observable<any> {
        return this._sendRequest('GET', this.APIurl + 'profile/' + id, null, this.httpOptions);
    }
}
