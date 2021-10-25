import { Component } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseControlValueAccessor } from '@shared/abstracts/BaseControlValueAccessor';

@Component({
    selector: 'input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent extends BaseControlValueAccessor<string> {
    constructor(public ngControl: NgControl) {
        super(ngControl);
    }
}
