import { Component, OnInit, Input, HostBinding } from '@angular/core';


@Component({
    selector: '[chip]',
    templateUrl: './chip.component.html',
    styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {
    @Input() icon: string;
    @HostBinding('class.chip') chip = true;
    @HostBinding('class.badge') badge = false;
    @HostBinding('class.chip__sm') @Input() small = false;
    @HostBinding('class.chip__blue') @Input() blue = false;
    @HostBinding('class.chip__match') @Input() match = false;
    @HostBinding('class.chip__error') @Input() error = false;
    @HostBinding('class.chip__disabled') @Input() disabled = false;
    @HostBinding('class.chip__w-icon') wIcon = false;

    constructor() {}

    public ngOnInit(): void {
        // detect if icon value exists within the icon font-family
        this.wIcon = !!this.icon;
    }
}
