import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormFieldMessageComponent} from './form-field-message.component';

describe('FormFieldMessageComponent', () => {
    let component: FormFieldMessageComponent;
    let fixture: ComponentFixture<FormFieldMessageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormFieldMessageComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormFieldMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
