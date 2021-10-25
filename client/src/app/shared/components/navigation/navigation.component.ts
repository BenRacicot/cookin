import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchService } from '@shared/services/search.service';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    public ingredients = [
        { id: 0, name: 'onion' },
        { id: 0, name: 'potato' }
    ];
    public form = <FormGroup>this.fb.group({
        search: this.fb.control(null)
    });

    constructor(
        private fb: FormBuilder,
        private searchService:SearchService,
        private router: Router
    ) { }

    ngOnInit(): void {
        /* ------------------------------------------------------------------------ *  
            watch for search results
            if a search occurs: navigate to home to see them
        * ------------------------------------------------------------------------ */
        this.searchService.results$.subscribe((res:any) => {
            if (res) {
                this.router.navigate(['']);
            }
        });        
    }

    public onSubmit(): void {
        this.searchService.getRecipes(this.form.value.search);
    }
}
