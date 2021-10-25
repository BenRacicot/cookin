import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { PageComponent } from './pages/page/page.component';

import { ChipComponent } from '@shared/components/chip/chip.component';
import { FloatingLabelComponent } from '@shared/components/input-floating-label/floating-label.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { FormFieldMessageComponent } from '@shared/components/form-field-message/form-field-message.component';
import { InputTagsComponent } from '@shared/components/input-tags/input-tags.component';
import { InputTextComponent } from '@shared/components/input-text/input-text.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';
import { StaticStarsComponent } from '@shared/components/static-stars/static-stars.component';
import { TypeaheadComponent } from '@shared/components/typeahead/typeahead.component';
import { ValidationComponent } from '@shared/components/validator/validator.component';
import { ResultsComponent } from './shared/components/results/results.component';
import { EnvComponent } from './pages/env/env.component';

@NgModule({
    declarations: [
        AppComponent,
        ChipComponent,
        FloatingLabelComponent,
        FormFieldComponent,
        FormFieldMessageComponent,
        HomeComponent,
        InputTagsComponent,
        InputTextComponent,
        NavigationComponent,
        PageComponent,
        PaginationComponent,
        ProgressBarComponent,
        StaticStarsComponent,
        TypeaheadComponent,
        ValidationComponent,
        NavigationComponent,
        ResultsComponent,
        EnvComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        FloatingLabelComponent,
        FormFieldMessageComponent,
        InputTagsComponent,
        InputTextComponent,
        PageComponent,
        PaginationComponent,
        ProgressBarComponent,
        StaticStarsComponent,
        TypeaheadComponent,
        ValidationComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
