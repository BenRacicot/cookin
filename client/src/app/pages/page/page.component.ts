import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { concatMap, Observable } from 'rxjs';

import { SearchService } from '@shared/services/search.service';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
    public recipe$: Observable<any[] | null> = null;

    constructor(
        private route: ActivatedRoute,
        private router:Router,
        private searchService:SearchService
    ) {
        this.searchService.closeNav(true);
    }

    ngOnInit(): void {
        this.recipe$ = this.route.firstChild.params.pipe(
            concatMap((params: Params) => this.searchService.getRecipe(params.id))
        );
        this.searchService.closeNav(true);
    }

    public back(): void {
        this.router.navigate(['']);
    }
}
