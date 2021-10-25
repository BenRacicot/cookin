import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { combineLatestWith, filter } from 'rxjs';

import { routerAnimation } from '@shared/animation/route-animations';
import { SearchService } from '@shared/services/search.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routerAnimation()]
})
export class AppComponent {
    public closed = true;

    constructor(
        private searchService:SearchService,
        private router: Router
    ) { 

        /* ------------------------------------------------------------------------ *  
            when a route change ends 
            check for search results
            open or close the navigation-area
        * ------------------------------------------------------------------------ */
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            combineLatestWith(this.searchService.results$)
        ).subscribe((res:any) => {
            const routerEvent:NavigationEnd = res[0];
            const results = res[1];
            this.closed = (routerEvent.url != "/" || (results !== null || results && results.results && results.results.length > 0)) ? true : false;       
        }); 
    }

    ngOnInit(): void {}

    public getRouteAnimation(outlet: RouterOutlet): any {
        const res = outlet.activatedRouteData.num === undefined ? -1 : outlet.activatedRouteData.num;
        return res;
    }
}
