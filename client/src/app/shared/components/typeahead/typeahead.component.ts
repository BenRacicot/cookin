import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    SimpleChanges,
    HostListener,
    ElementRef,
    Optional
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseControlValueAccessor } from '@shared/abstracts/BaseControlValueAccessor';

@Component({
    selector: '[typeahead-dropdown], typeahead-dropdown',
    templateUrl: './typeahead.component.html',
    styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent
    extends BaseControlValueAccessor
    implements OnInit
{
    @Input() term = ''; // the user-entered value

    // typeahead source
    @Input() source: any[] = []; // array to filter for typeahead results
    public sourceFiltered: any[];

    // dropdown setup
    @Input() active = false; // toggle dropdown
    @Input() filterKeys: string[] | null = null; // optional key names to filter object values
    @Input() displayKeys: string[] | null = null; // optional key names for typeahead-results/tags to display
    public arrow = -1;

    // user selection
    @Output() selectionOutput = new EventEmitter();

    /* ------------------------------------------------------------------------ *
        Active = true displays typeahead .dropdown menu
        !Active when clicking anywhere outside the parent component
        Note: the parent component handles floating-label logic
    * ------------------------------------------------------------------------ */
    @HostListener('document:click', ['$event']) onClick(
        event: MouseEvent
    ): void {
        if (
            this.eRef.nativeElement.parentNode.parentNode.contains(event.target)
        ) {
            // click inside component
            this.active = true;
        } else {
            // click outside component
            this.active = false;
            this.arrow = -1; // reset
        }
    }

    @HostListener('window:keyup', ['$event']) onArrow(
        event: KeyboardEvent
    ): void {
        if (
            this.eRef.nativeElement.parentNode.parentNode.contains(event.target)
        ) {
            let resultId;
            // console.log(this.eRef.nativeElement.querySelectorAll('.dropdown__link')[0]);
            // console.log(this.eRef.nativeElement.querySelector('[result-id="'+ 0 +'"]'));
            // arrow key down through list items, displayed by sourceFiltered's objects
            if (
                event.keyCode === 40 &&
                this.arrow < this.sourceFiltered.length - 1
            ) {
                this.arrow++;
            }

            if (event.keyCode === 38 && this.arrow > 0) {
                this.arrow--;
            }

            // enter key / select
            if (event.keyCode === 13 && this.arrow !== -1) {
                resultId = this.eRef.nativeElement
                    .querySelectorAll('.dropdown__link')
                    [this.arrow].getAttribute('result-id');
                this.select(resultId);
            }
        }
    }

    constructor(
        private eRef: ElementRef,
        @Optional() public ngControl: NgControl
    ) {
        super(ngControl);
    }

    public ngOnInit(): void {
        super.ngOnInit();
        this.normalizeSource(this.source);
        this.filterSource(this.term);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('term' in changes || 'source' in changes) {
            this.filterSource(this.term);
        }
        // if ('active' in changes) {
        //     console.log(this.active);
        // }
    }

    /* ------------------------------------------------------------------------ *
      if the parent component has provided unusable data
       - comma-separated strings
       - any other source manipulation
    * ------------------------------------------------------------------------ */
    public normalizeSource(source): void {
        if (!source) {
            return;
        }
        const normalizedSource = [];

        // for (const item of source) {}

        for (let i = 0, j = source.length; i < j; i++) {
            const item = source[i];
            if (typeof item === 'string' && item.includes(',')) {
                for (let i = 0, j = item.split(',').length; i < j; i++) {
                    normalizedSource.push(item.split(',')[i]);
                }
                this.source = normalizedSource;
            }
        }
    }

    public select(contact: any): void {
        this.value = contact;
        this.onChange(contact);
        this.selectionOutput.emit(contact);
    }

    /* ------------------------------------------------------------------------ *
        filterSource(term: string)
        loop through `filterKeys` to find matches with `term`
        when a match is found push the object to results for the view
    * ------------------------------------------------------------------------ */
    public filterSource(term?: string): void {
        // wait for more than 1 character or reset the filter to source
        if (term && term.length > 0) {
            let results = [];
            // test for object filtering or simple string values
            if (this.filterKeys) {
                for (let i = 0, j = this.filterKeys.length; i < j; i++) {
                    this.source
                        .filter(
                            (source) =>
                                source[this.filterKeys[i]]
                                    .toLowerCase()
                                    .indexOf(term.toLowerCase()) === 0
                        )
                        .forEach(function (result) {
                            results.push(result);
                        });
                }
            } else {
                results = this.source.filter(
                    (source) =>
                        source.toLowerCase().indexOf(term.toLowerCase()) === 0
                );
            }
            this.sourceFiltered = results;
        } else {
            this.sourceFiltered = this.source;
        }
    }

    // can slow perf
    public trackByFn(index: any, item: { id: void }): void {
        return item.id; // unique id corresponding to the item (id and index should be the same)
    }
}
