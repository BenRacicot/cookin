import {
    Component,
    Input,
    ElementRef,
    HostListener,
    Optional,
    Self
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    FormControl,
    NgControl
} from '@angular/forms';

import {UtilityService} from '@shared/services/utility.service';
import {BaseControlValueAccessor} from '@shared/abstracts/BaseControlValueAccessor';

@Component({
    selector: 'input-tags',
    templateUrl: './input-tags.component.html',
    styleUrls: ['./input-tags.component.scss']
})
export class InputTagsComponent extends BaseControlValueAccessor {
    public float = false; // toggle floating label position
    public dropdownActive = false;

    // InputTagsComponent drives a nested FormGroup where entries (tags) are put into its FormArray
    public form = <FormGroup>this.fb.group({
        tags: this.fb.array([])
    });

    // native input @Inputs
    @Input() type = 'text';
    @Input() minLength: number | null = null;
    @Input() maxLength: number | null = null;

    // tag related
    @Input() maxTags: number | null = null;
    public single = false; // when maxTags = 1 single becomes true for select-like UI

    // typeahead
    @Input() typeAhead: any[]; // source array for typeahead.component to filter
    @Input() filterKeys: string[] = null; // optional key names to filter object values
    @Input() displayKeys: string[] = null; // optional key names for typeahead-results/tags to display

    @HostListener('document:click', ['$event']) onClick(
        event: MouseEvent
    ): void {
        // click inside component
        if (this.eRef.nativeElement.contains(event.target)) {
            this.float = true;
            this.eRef.nativeElement
                .querySelector('.floating-label__input')
                .focus();
        } else {
            // click outside component
            if (this.value === '' && !this.single) {
                this.float = false;
            }
        }
    }

    get tagsArray(): FormArray {
        return this.form.get('tags') as FormArray;
    }

    constructor(
        private eRef: ElementRef,
        private fb: FormBuilder,
        private utilityService: UtilityService,
        @Optional() @Self() public ngControl: NgControl
    ) {
        super(ngControl);
        // debugging
        // this.form.valueChanges.subscribe((data) => {
        //    console.log(data);
        // });
    }

    writeValue(tags: any[]): void {
        this.addTags(tags);
    }

    /* ------------------------------------------------------------------------ *
        addTags(string[] | number[] | Object[])
        - objects must include an id that matches a typeAhead item
        - tag values are saved as strings or numbers
    * ------------------------------------------------------------------------ */
    public addTags(tags: any[]): void {
        if (!tags || tags.length < 1) {
            return;
        }
        if (typeof tags === 'string') {
            tags = [tags];
        } // force values into an array

        for (let i = 0, j = tags.length; i < j; i++) {
            if (!isNaN(tags[i])) {
                if (this.validTag(tags[i])) {
                    this.tagsArray.push(new FormControl(tags[i]));
                }
                continue;
            }

            // simple text strings
            if (typeof tags[i] === 'string') {
                // separate comma delimited values ['one, two'] or ['0,1,2']
                if (tags[i].includes(',')) {
                    for (
                        let ii = 0, jj = tags[i].split(',').length;
                        ii < jj;
                        ii++
                    ) {
                        // if typeAhead exists we need numeric ids
                        const tag = this.typeAhead
                            ? +tags[i].split(',')[ii]
                            : tags[i].split(',')[ii];

                        if (this.validTag(tag)) {
                            this.tagsArray.push(new FormControl(tag));
                        }
                    }
                } else {
                    if (this.validTag(tags[i])) {
                        this.tagsArray.push(new FormControl(tags[i]));
                    }
                }
            } else {
                // dropdown selections arrive as the selected object from typeAhead[]
                if ('id' in tags[i]) {
                    if (this.validTag(tags[i])) {
                        this.tagsArray.push(new FormControl(+tags[i].id));
                        this.float = true;
                    }
                    continue;
                }
            }
        }

        if (this.tagsArray.length === this.maxTags) {
            this.value = '';
            this.dropdownActive = false;
            this.single = true;
        }

        if (this.tagsArray.length > 0) {
            this.value = '';
            this.float = true;
        }
        // console.log(tags, this.tagsArray); // debug
    }

    public removeTag(i: number): void {
        this.tagsArray.removeAt(i);
        this.single = false;
    }

    /* ------------------------------------------------------------------------ *
        disallow null, empty, whitespace-only, duplicates, enforce maxTags limit
        and disallow string entries when displayKeys is set
    * ------------------------------------------------------------------------ */
    public validTag(value: string | number): boolean {
        const valid = [];

        if (typeof value === 'string') {
            valid.push(!(value.match(/^ *$/) !== null)); // test for whitespace
            valid.push(!!value);
        }
        valid.push(this.maxTags !== this.tagsArray.length);
        valid.push(
            !this.utilityService.duplicates(value, this.tagsArray.value)
        );

        return !valid.includes(false);
    }

    public findMatch(id: number) {
        const match = this.typeAhead.find((obj) => obj.id === +id);
        return match[this.displayKeys[0]];
    }

    registerOnChange(fn: any): void {
        this.tagsArray.valueChanges.subscribe(fn);
    }

    onInput(event: any): void {}
    onFocus(event: any): void {
        this.float = true;
    }
    onBlur(event: any): void {
        this.dropdownActive = false;
    }
}
