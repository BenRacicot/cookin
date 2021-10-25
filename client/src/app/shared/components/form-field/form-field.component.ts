import { AfterContentInit, Component, ContentChild, Input } from '@angular/core';
import {
    FormControl,
    FormControlDirective,
    FormControlName,
    FormGroup,
    NgModel,
    ValidationErrors
} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from '@shared/abstracts/abstract.component';
import { FormFieldMessageComponent } from '../form-field-message/form-field-message.component';

@Component({
    selector: 'form-field',
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent extends AbstractComponent implements AfterContentInit {
    @Input('class')
    classes: string;

    @Input()
    helperText: string;

    @Input()
    successText: string;

    @Input()
    disabledText: string;

    @Input()
    formGroup: FormGroup;

    @Input()
    formControl: FormControl;

    @ContentChild(FormFieldMessageComponent)
    messageComponent: FormFieldMessageComponent;

    @ContentChild(FormControlName)
    formControlName: FormControlName;

    @ContentChild(FormControlDirective)
    formControlDirective: FormControlDirective;

    @ContentChild(NgModel)
    ngModel: NgModel;

    disabled = false;
    valid = false;

    private _errorMessage: string;
    private _hintMessage: string;

    get errorMessage() {
        return this._errorMessage;
    }

    set errorMessage(value: string) {
        this._errorMessage = value;
        this.messageComponent && (this.messageComponent.errorMessage = value);
    }

    get hintMessage() {
        return this._hintMessage;
    }

    set hintMessage(value: string) {
        this._hintMessage = value;
        this.messageComponent && (this.messageComponent.hintMessage = value);
    }

    constructor() {
        super();
    }

    ngAfterContentInit(): void {
        this.setControl();

        if (!this.formControl && !this.formGroup) {
            return;
        }
        this.checkValueChange();
        this.setMessage();
    }

    setControl() {
        if (this.formControl) {
            return;
        }
        const formControl = this.formControlName || this.formControlDirective || this.ngModel;

        if (formControl) {
            this.formControl = formControl.control as FormControl;
        }
        return null;
    }

    get inputError() {
        return this.formControl && this.formControl.invalid && this.formControl.dirty;
    }

    checkValueChange() {
        if (this.formControl) {
            this.disabled = this.formControl.disabled;

            this.formControl.valueChanges.pipe(takeUntil(this._ngUnsubscribe)).subscribe(data => {
                // disabled messaging
                this.disabled = this.formControl.disabled;
                // error messaging
                if (this.formControl.errors) {
                    this.errorType(this.formControl.errors);
                    this.valid = false;
                } else {
                    this.valid = true;
                    this.errorMessage = '';
                }
                // success messaging
                if (this.successText && !this.formControl.errors && this.formControl.valid) {
                    this.hintMessage = data === '' ? this.helperText : this.successText;
                }
            });
        }

        if (this.formGroup) {
            this.formGroup.disabled && (this.disabled = true);

            this.formGroup.statusChanges.pipe(takeUntil(this._ngUnsubscribe)).subscribe(() => {
                this.disabled = this.formGroup.disabled;

                if (this.formGroup.errors) {
                    this.errorMessage = this.formGroup.errors.message;
                    this.valid = false;
                } else {
                    this.errorMessage = '';
                    this.valid = true;
                }
            });
        }
    }

    errorType(error: ValidationErrors) {
        const errorType = Object.keys(error)[0];

        if (this[errorType]) {
            const errorMethod = this[errorType].bind(this);
            errorMethod(error);
        } else {
            this.default();
        }
    }

    setMessage() {
        if (!this.messageComponent) {
            return;
        }
        this.messageComponent.disabledText = this.disabledText;
    }

    /**
     * Validator Methods
     */

    public default() {
        this.errorMessage = 'Check values';
    }

    // https://angular.io/api/forms/Validators#min
    public min(error: ValidationErrors) {
        // {min: {min: 3, actual: 2}}
        // this.control.errors.min.min
        // this.control.errors.min.actual
        this.errorMessage = `${error.min.min} required`;
    }

    public max(error: ValidationErrors) {
        // {max: {max: 15, actual: 16}}
        // error.max.max
        // error.max.actual
        const overage = error.max.actual - error.max.max;
        this.errorMessage = `${overage} over`;
    }

    public minlength(error: ValidationErrors) {
        const more = error.minlength.requiredLength - error.minlength.actualLength;
        this.errorMessage = `At least ${more} more characters`;
    }

    public maxlength(error: ValidationErrors) {
        const overage = error.maxlength.actualLength - error.maxlength.requiredLength;
        this.errorMessage = `Remove ${overage} characters`;
    }

    public required() {
        this.errorMessage = 'Required';
    }

    // https://angular.io/api/forms/Validators#requiredtrue
    public requiredTrue() {
        this.errorMessage = 'Required';
    }

    public email() {
        this.errorMessage = 'Not a valid email address';
    }

    public nullValidator() {
        this.errorMessage = 'Required';
    }

    public pattern() {
        this.errorMessage = 'This is invalid';
    }

    /* ------------------------------------------------------------------------ *
        CUSTOM VALIDATORS
    * ------------------------------------------------------------------------ */
    public duplicate() {
        this.errorMessage = 'Duplicate values';
    }
    public alpha() {
        this.errorMessage = 'Numbers are invalid';
    }
    public number() {
        this.errorMessage = 'Numbers only';
    }
    public currency() {
        this.errorMessage = 'Only numbers, $, and .';
    }
    public emailDomainMismatch() {
        console.log('Email must match domain');
        this.errorMessage = 'Email must match domain';
    }
}
