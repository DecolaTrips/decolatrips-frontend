import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';



import { AppComponent } from './app.component';
import { Dashboard } from './pages/admin/sidebar/dashboard/dashboard';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppComponent,
    AppComponent,
    Dashboard,
    NgChartsModule
    
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
