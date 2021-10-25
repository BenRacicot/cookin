import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { IPagination } from '@shared/interfaces';

const N_PAGES = 4;

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
    total: number = 0;
    page: number = 0;
    size: number = 10;
    pages = [];

    constructor(private router: Router) {}

    @Input()
    set pagination(value: IPagination) {
        const { total, page, size } = value;

        this.size = size;

        if (total === 0) {
            this.pages = [];
            this.page = 0;
            this.total = 0;
            return;
        }

        const reset =
            !this.pages.length ||
            this.total !== total ||
            !this.pages.find((p) => p.page === page) ||
            this.pages[this.pages.length - 1].page === page ||
            this.pages[0].page === page;

        this.total = total;
        this.page = page;

        if (!reset) {
            return;
        }

        let first = page - 2 > 0 ? page - 2 : 1;
        let last = first + N_PAGES <= total ? first + N_PAGES : total;

        if (first - last < N_PAGES && this.total > N_PAGES) {
            if (first === 1) last = first + N_PAGES;
            else if (last === this.total) first = last - N_PAGES;
        }

        this.pages = [];
        for (let i = first; i <= last; i++) {
            this.pages.push({ page: i, disabled: false });
        }
    }

    @Input()
    loading = false;

    @Input()
    navigate = true;

    @Output()
    onChange = new EventEmitter();

    goTo(page: number) {
        this.onChange.emit(page);

        if (!this.navigate) return;

        this.router.navigate([], {
            queryParams: {
                page,
                size: this.size
            },
            queryParamsHandling: 'merge'
        });
    }
}
