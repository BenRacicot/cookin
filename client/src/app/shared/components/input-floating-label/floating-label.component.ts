import {
    Component,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    Renderer2,
    OnInit,
    ChangeDetectorRef,
    Optional
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { DecimalPipe, DatePipe } from '@angular/common';
import { BaseControlValueAccessor } from '@shared/abstracts/BaseControlValueAccessor';

@Component({
    selector: 'input-floating-label',
    templateUrl: './floating-label.component.html',
    styleUrls: ['./floating-label.component.scss'],
    providers: [DecimalPipe, DatePipe]
})
export class FloatingLabelComponent
    extends BaseControlValueAccessor<string>
    implements OnInit {
    // input types: usd and time are custom
    @Input() type = 'text';
    @Input() usd = false;
    @Input() time: string;
    // attributes
    @Input() inputmode = '';
    @Input() autocomplete = 'off';
    @Input() maxLength = 10000;
    @Input() name: string; // input name
    @Input() label: string; // floating label text

    // Material design style https://material.io/components/text-fields#interactive-demo
    @Input() matStyle: 'outline' | 'filled' = 'outline';

    // prepended / appended icons (or button if 'btn')
    @Input() append: string;
    @Input() prepend: string;
    // icon/button click events
    @Output() prependClick: EventEmitter<boolean> = new EventEmitter();
    @Output() appendClick: EventEmitter<boolean> = new EventEmitter();

    // typeahead
    @Input() typeAhead: any[]; // source array for typeahead.component to filter
    @Input() filterKeys; // optional key names to filter object values
    @Input() displayKeys; // optional key names for typeahead-results/tags to display
    @Input() dropdownActive = false;

    // toggle floating label position
    public float = false;

    constructor(
        private decimalPipe: DecimalPipe,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef,
        private eRef: ElementRef,
        @Optional() public ngControl: NgControl
    ) {
        super(ngControl);
    }

    public ngOnInit() {
        super.ngOnInit();
        this.float = !!this.value;
    }

    // required ControlValueAccessor interface methods
    public writeValue(val: string) {
        this.value = val || '';
        this.float =
            this.value !== '' || this.type === 'date' || this.type === 'time'; // for autocomplete values added onload
    }

    public onInput(val: string) {
        // currency formatted strings
        if (this.usd) {
            const inputElement = this.eRef.nativeElement.querySelectorAll(
                '.floating-label__input'
            )[0];
            const invalids = new RegExp('[^0-9]', 'g'); // anything NOT in brackets
            const numeric = String(val).replace(invalids, '');
            // format the number (add commas)
            this.value = this.decimalPipe.transform(numeric, '1.0', 'en-US');
            // set the native input with the formatted value
            this.renderer.setProperty(inputElement, 'value', this.value);
        } else if (this.time) {
            // force time formatted strings when time=true
            const inputElement = this.eRef.nativeElement.querySelectorAll(
                '.floating-label__input'
            )[0];
            const invalids = new RegExp('[^0-9:]{1,6}', 'g');
            this.value = String(val).replace(invalids, '');
            this.renderer.setProperty(inputElement, 'value', this.value);
        } else {
            this.value = val.trim();
        }
        this.onChange(this.value); // this is what sets the control/form value
        this.cdr.detectChanges();
    }

    // Autocomplete dropdown
    public setSelectedOption(e) {
        console.log(e);
    }

    public onFocus() {
        this.float = true;
        this.cdr.detectChanges();
    }

    public onBlurred() {
        this.onTouched();
        this.float =
            this.value !== '' || this.type === 'date' || this.type === 'time'
                ? true
                : false;
        this.cdr.detectChanges();
    }

    public onAppendClick(): void {
        this.appendClick.emit(true);
    }

    public onPrependClick(): void {
        this.prependClick.emit(true);
    }
}
