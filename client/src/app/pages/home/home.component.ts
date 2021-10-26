import { Component, OnInit } from '@angular/core';

import { SearchService } from '@shared/services/search.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private searchService:SearchService) {

        // this.searchService.closeNav(true);
    }

    ngOnInit(): void { }

}
