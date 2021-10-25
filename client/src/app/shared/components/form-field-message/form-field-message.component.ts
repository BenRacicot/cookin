/**
 * Shows error or hint message of a form control.
 * It can show the message by passing the inputs or
 * `form-field` component automatically sets the messages when this component used as a content
 */
import {Component, HostBinding, Input} from '@angular/core';

@Component({
    selector: 'form-field-message',
    templateUrl: './form-field-message.component.html',
    styleUrls: ['./form-field-message.component.scss']
})
export class FormFieldMessageComponent {
    @Input()
    errorMessage: string;

    @Input()
    disabledText: string;

    @Input()
    hintMessage: string;

    @HostBinding('class')
    classes = 'validation';
}
