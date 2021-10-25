import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, take } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private _url = 'recipes';
    private _commaTest = new RegExp('[\,]', 'g');
    public results$: BehaviorSubject<any> = new BehaviorSubject<any[] | null>(null);
    public ingEntered$: BehaviorSubject<any> = new BehaviorSubject<any[] | null>(null);
    public ingReturned$: BehaviorSubject<any> = new BehaviorSubject<any[] | null>(null);

    constructor(
        private apiService: ApiService,
        private router:Router
    ) { }

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

    public getRecipe(id: string): Observable<any> {
        return this.apiService.get<any>(`${this._url}/${id}`);
    }
}
