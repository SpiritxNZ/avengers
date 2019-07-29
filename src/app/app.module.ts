import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app/app-routing.module';
import { MatDialogModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatPaginatorModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { JobsPanelComponent } from './components/jobs/jobs-panel/jobs-panel.component';
import { JobsSearchbarComponent } from './components/jobs/jobs-searchbar/jobs-searchbar.component';
import { JobsListingComponent } from './components/jobs/jobs-listing/jobs-listing.component';
import { NavbarComponent } from './components/general/navbar/navbar.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { JobComponent } from './components/jobs/job/job.component';
import { TestComponent } from './components/test/test.component';
import { JobDetailComponent } from './components/jobs/job-detail/job-detail.component';

import { SanitizehtmlPipe } from './pipes/sanitizehtml.pipe';


@NgModule({
  declarations: [
    AppComponent,
    JobsPanelComponent,
    JobsSearchbarComponent,
    JobsListingComponent,
    NavbarComponent,
    FooterComponent,
    JobComponent,
    TestComponent,
    JobDetailComponent,
    SanitizehtmlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatDividerModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }