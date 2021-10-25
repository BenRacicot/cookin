import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StaticStarsComponent} from './static-stars.component';

describe('StaticStarsComponent', () => {
    let component: StaticStarsComponent;
    let fixture: ComponentFixture<StaticStarsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StaticStarsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StaticStarsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
