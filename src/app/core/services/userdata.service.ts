import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
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
export class UserDataService implements OnInit {

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

    constructor(private http: HttpClient, private router: Router) {
        this.user.username = null;
    }

    ngOnInit() {}

    updateUserData(user: User) {
        this.repoUser.next(user);
    }

    makeLogin() {
        this.getUserProfile().pipe(map((res) => {
            this.user = new User().deserialize(res.body);
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

    registerNewUser(data): Observable<any> {
        return this.sendRequest('POST', this.APIurl + 'register', data, this.httpOptions);
    }
}
