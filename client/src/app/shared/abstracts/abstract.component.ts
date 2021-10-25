import {Directive, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

@Directive({})
export abstract class AbstractComponent implements OnDestroy {
    protected _ngUnsubscribe = new Subject();

    ngOnDestroy() {
        this._ngUnsubscribe.next(null);
        this._ngUnsubscribe.complete();
    }

    trackByFor(item) {
        return item.id;
    }
}
