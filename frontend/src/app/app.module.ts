import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApplicationFormComponent } from './applicationForm/applicationForm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { ReviewComponent } from '../app/review/review.component';
import { OverviewComponent } from '../app/overview/overview.component';
import { DbService } from './db-service';
import { AdviceComponent } from './advice/advice.component';
import { ViewComponent } from './view/view.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PreApplicationComponent } from './pre-application/pre-application.component';
import { DecisionComponent } from './decision/decision.component';
import { OorkondeComponent } from './oorkonde/oorkonde.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { UserFormComponent } from './user-form/user-form.component';
import { TranslationComponent } from './translation/translation.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: "", component: LoginComponent },
            { path: "login", component: LoginComponent },
            { path: "review/:id", component: ReviewComponent, canActivate: [AuthGuard] },
            { path: "overview", component: OverviewComponent, canActivate: [AuthGuard] },
            { path: "advice/:id", component: AdviceComponent, canActivate: [AuthGuard] },
            { path: "view/:id", component: ViewComponent, canActivate: [AuthGuard] },
            { path: "application/:rrn", component: ApplicationFormComponent, canActivate: [AuthGuard] },
            { path: "pre-application", component: PreApplicationComponent, canActivate: [AuthGuard] },
            { path: "decision/:id", component: DecisionComponent, canActivate: [AuthGuard] },
            { path: "oorkonde/:id", component: OorkondeComponent, canActivate: [AuthGuard]},
            { path: "user-managment", component: UserManagmentComponent, canActivate: [AuthGuard] },
            { path: "user-form", component: UserFormComponent, canActivate: [AuthGuard] },
            { path: "translation/:id", component: TranslationComponent, canActivate: [AuthGuard] },
            { path: "**", component: OverviewComponent }
        ]),
        FormsModule
    ],
    declarations: [
        LoginComponent,
        AppComponent,
        ReviewComponent,
        OverviewComponent,
        AdviceComponent,
        ViewComponent,
        ApplicationFormComponent,
        NavigationComponent,
        PreApplicationComponent,
        DecisionComponent,
        OorkondeComponent,
        UserManagmentComponent,
        UserFormComponent,
        TranslationComponent
    ],
    providers: [
        DbService,
        HttpClientModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
