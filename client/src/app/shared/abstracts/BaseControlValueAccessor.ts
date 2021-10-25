import {Directive, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';

import {AbstractComponent} from '@shared/abstracts/abstract.component';

@Directive()
export class BaseControlValueAccessor<T extends unknown = unknown>
    extends AbstractComponent
    implements ControlValueAccessor, OnInit
{
    @Input()
    disabled: boolean;

    @Input()
    required = false;

    @Input()
    label = '';

    @Input()
    hideLabel = false;

    @Input()
    name = '';

    @Input()
    placeholder = '';

    @Input()
    value: T;

    constructor(public ngControl: NgControl) {
        super();

        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    ngOnInit() {
        if (!this.control) {
            return;
        }
        this.control.statusChanges
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(() => {
                this.disabled = this.control.disabled;
            });
    }

    get control() {
        return this.ngControl && this.ngControl.control;
    }

    /**
     * Call when value has changed programmatically
     */
    public onChange(newVal: T) {}
    public onTouched(_?: any) {}

    /**
     * Model -> View changes
     */
    public writeValue(obj: T) {
        this.value = obj;
    }

    public registerOnChange(fn: any) {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    public setDisabledState?(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
}
