import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileManagerService } from './file-manager.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatTreeModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent, SidebarComponent, FileViewerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatTreeModule,
    MatIconModule
  ],
  providers: [FileManagerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
