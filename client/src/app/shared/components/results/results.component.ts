import { Component, OnDestroy, OnInit } from '@angular/core';

import { SearchService } from '@shared/services/search.service';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
    private _ngUnsubscribe: Subject<void> = new Subject<void>();
    public results$!: Observable<any>;
    public ingReturned$!: Observable<any>;
    public ingEntered$!: Observable<any>;

    constructor(private searchService:SearchService) { }

    ngOnInit(): void {
        this.results$ = this.searchService.results$.pipe();
        this.results$.subscribe((res:any) => {
            console.log(res);
        });
        this.ingReturned$ = this.searchService.ingReturned$.pipe();
        this.ingEntered$ = this.searchService.ingEntered$.pipe();
    }

    private compareIngredients(ingArr: any[], check:string): boolean {
        return ingArr.includes(check);
    }

    public ngOnDestroy(): void {
        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

}
