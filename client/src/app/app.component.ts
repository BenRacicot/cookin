import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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

    constructor(private searchService:SearchService) { 
        this.searchService.closedNav$.subscribe((res:boolean) => {
            this.closed = res;
        });         
    }

    ngOnInit(): void {}

    public getRouteAnimation(outlet: RouterOutlet): any {
        const res = outlet.activatedRouteData.num === undefined ? -1 : outlet.activatedRouteData.num;
        return res;
    }
}
