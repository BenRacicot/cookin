import {
    Component,
    OnInit,
    Input,
    SimpleChanges,
    OnChanges,
    HostBinding
} from '@angular/core';

@Component({
    selector: 'static-stars',
    templateUrl: './static-stars.component.html',
    styleUrls: ['./static-stars.component.scss']
})
export class StaticStarsComponent implements OnInit, OnChanges {
    @Input() rating: string;
    @Input() label: string;
    @HostBinding('attr.aria-label') aria;
    @HostBinding('tabindex') tab = 0;

    constructor() {}

    public ngOnInit(): void {
        this.aria = this.label
            ? `${this.label} star rating: ${this.rating}`
            : '';
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.rating = changes.rating.currentValue;
    }
}
