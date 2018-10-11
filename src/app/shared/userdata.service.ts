import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user.interface';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

const HOSTNAME = '127.0.0.1';
const PROTOCOL = 'http';
const PORT = 3000;

@Injectable({
  providedIn: 'root'
})
export class UserDataService implements OnInit {

    public user: User = {
        username: null,
        mail: null
    };

    private repoUser = new BehaviorSubject<User>(this.user);
    currentUserData = this.repoUser.asObservable();

    private APIurl = `${PROTOCOL}://${HOSTNAME}:${PORT}/api/`;

    private httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
    };

    ngOnInit(){}

    updateUserData(user: User) {
        this.repoUser.next(user);
    }

    makeLogin() {
        this.getUserInfo().subscribe((res) => {
            const response = res['body'];
            if (response) {
              this.user.username = response['user']['username'];
              this.user.mail = response['user']['mail'];
              this.updateUserData(this.user);
            }
          });
    }

  constructor(private http: HttpClient, private router: Router) { }

    private sendRequest(method: any, url: string, body: any, headers: object) {
        const req = new  HttpRequest(method, url, body, headers);
        return this.http.request(req);
    }

    authenticate(data): Observable<any> {
        return this.sendRequest('POST', this.APIurl + 'login', data, this.httpOptions);
    }

    getUserInfo(): Observable<any> {
        const secureHeaders = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*'
            })
        };
        return this.sendRequest('GET', this.APIurl + 'profile', null, secureHeaders);
    }

    registerNewUser(data): Observable<any> {
        return this.sendRequest('POST', this.APIurl + 'register', data, this.httpOptions);
    }

}