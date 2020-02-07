import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

const ORIGIN = 'http://127.0.0.1:4200';
const HOSTNAME = '127.0.0.1';
const PROTOCOL = 'http';
const PORT = 3000;

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

    constructor(private http: HttpClient, private router: Router) {
        this.user.username = null;
        this.user.avatar = `${PROTOCOL}://${HOSTNAME}:${PORT}/api/avatar`;
    }

    private user = new User();
    private repoUser = new BehaviorSubject<User>(this.user);
    currentUserData = this.repoUser.asObservable();
    private APIurl = `${PROTOCOL}://${HOSTNAME}:${PORT}/api/`;

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


    updateUserData(user: User) {
        this.repoUser.next(user);
        console.log(user)
    }   

    makeLogin() {
        this.getUserProfile().pipe(map((res) => {
            this.user.deserialize(res.body);
            this.updateUserData(this.user);
        })).subscribe();
    }

    private sendRequest(method: any, url: string, body: any, headers: object) {
        const req = new  HttpRequest(method, url, body, headers);
        return this.http.request(req);
    }

    authenticate(data): Observable<any> {
        return this.sendRequest('POST', this.APIurl + 'login', data, this.httpOptions);
    }

    getUserProfile(): Observable<any> {
        return this.sendRequest('GET', this.APIurl + 'profile', null, this.httpOptions);
    }

    getProfessions() {
        return this.sendRequest('GET', this.APIurl + 'professions', null, this.httpOptions);
    }

    registerNewUser(data): Observable<any> {
        this.httpOptions.withCredentials = false;
        return this.sendRequest('POST', this.APIurl + 'register', data, this.httpOptions);
    }

    putUserAvatar(data): Observable<any> {
        return this.sendRequest('PUT', this.APIurl + 'uploadAvatar', data, this.httpOptionsMultipart);
    }

    updateProfessions(data): Observable<any> {
        return this.sendRequest('POST', this.APIurl + 'updateProfessions', data, this.httpOptions);
    }
    addProduction(data): Promise<any> {
        return this.sendRequest('POST', this.APIurl + 'addProduction', data, this.httpOptions).toPromise();
    }
}
