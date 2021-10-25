import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '@env';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    public get<T>(path: string, routerParams?: Params): Observable<T> {
        let queryParams: Params = {};
        if (routerParams) {
            queryParams = this.setParameter(routerParams);
        }
        return this.http.get<T>(this.path(path), { params: queryParams });
    }

    public put<T>(path: string, body: Record<string, any> = {}): Observable<any> {
        return this.http.put(this.path(path), body);
    }

    public post<T>(path: string, body: Record<string, any> = {}): Observable<any> {
        return this.http.post(this.path(path), body);
    }

    public delete<T>(path: string): Observable<any> {
        return this.http.delete(this.path(path));
    }

    private setParameter(routerParams: Params): HttpParams {
        let queryParams = new HttpParams();
        for (const key in routerParams) {
            if (routerParams.hasOwnProperty(key)) {
                queryParams = queryParams.set(key, routerParams[key]);
            }
        }
        return queryParams;
    }

    private path(path: string): string {
        return `${environment.api_url}${path}`;
    }

}
