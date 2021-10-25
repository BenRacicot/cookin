import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { EnvComponent } from './pages/env/env.component';
import { PageComponent } from './pages/page/page.component';

const routes: Routes = [
    {
        path: 'env',
        component: EnvComponent,
        data: { num: 2 }
    },
    {
        path: 'page', 
        component: PageComponent, 
        data: { num: 2 },
        children: [
            { path: ':id', component: PageComponent }
        ]
    },
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        data: { num: 1 }
    }    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
