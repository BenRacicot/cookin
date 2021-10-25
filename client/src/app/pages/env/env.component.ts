import { Component, OnInit } from '@angular/core';

import { ApiService } from '@shared/services/api.service';
import { take } from 'rxjs';

@Component({
    selector: 'app-env',
    templateUrl: './env.component.html',
    styleUrls: ['./env.component.scss']
})
export class EnvComponent implements OnInit {
    public variables: any;

    constructor(private apiService:ApiService) { }

    ngOnInit(): void {
        this.apiService.get('env').pipe( 
            take(1)
        ).subscribe((res:any) => {
            this.variables = res;
        });
    }

}
