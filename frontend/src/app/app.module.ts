import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AanvraagFormulierComponent } from './aanvraagFormulier/aanvraagFormulier.component';
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
import { DecisionComponent } from './decision/decision.component';


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
            { path: "decision/:id", component: DecisionComponent, canActivate: [AuthGuard] },
            { path: "application", component: AanvraagFormulierComponent, canActivate: [AuthGuard] },
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
        AanvraagFormulierComponent,
        NavigationComponent,
        DecisionComponent
    ],
    providers: [
        DbService,
        HttpClientModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
