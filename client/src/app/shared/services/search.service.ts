import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, combineLatestWith, filter, Observable, take } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private _url = 'recipes';
    private _commaTest = new RegExp('[\,]', 'g');
    public closedNav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public results$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
    public ingEntered$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
    public ingReturned$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);

    constructor(
        private apiService: ApiService,
        private router:Router
    ) {
        /* ------------------------------------------------------------------------ *  
            when a route change ends 
            check for search results
            open or close the navigation-area
                any component can toggle the nav size
        * ------------------------------------------------------------------------ */
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            combineLatestWith(this.results$)
        ).subscribe((res:any) => {
            const routerEvent:NavigationEnd = res[0];
            const results = res[1];
            // this.closed = (routerEvent.url != "/" || (results !== null || results && results.results && results.results.length > 0)) ? true : false;       
            let closed = results && results.results && results.results.length > 0 ? true : false;
            this.closeNav(closed);
        });         
    }

    public getRecipe(id: string): Observable<any> {
        return this.apiService.get<any>(`${this._url}/${id}`);
    }

    public getRecipes(query?: string): void {
        // A basic check if string contains a list
        const ingredients = query.match(this._commaTest) ? query.split(',') : null;
        this.ingEntered$.next(ingredients);

        this.apiService.get<any>(`${this._url}`, {params: query}).pipe(
            take(1)
        ).subscribe((res:any) => {
            // set results
            this.results$.next(res);
            // go back home to see new results
            this.router.navigate(['']);
        });
    }

    public clearRecipes(): void {
        this.results$.next(null);
        this.ingEntered$.next(null);
        this.ingReturned$.next(null);
    }

    public closeNav(closed:boolean): void {
        this.closedNav$.next(closed);
    }

    // return ingredients from a recipe object
    public extractIngredients(ingArr: any[]): string[] {
        let ings = [];
        if (ingArr && Array.isArray(ingArr)) {     
            for ( let i = 0, j = ingArr.length; i < j; i++ ) {
                ings.push(ingArr[i].name);
            }
            return ings;
        } else {
            return [];
        }
    }

}
