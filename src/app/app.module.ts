import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonsModule } from './commons/commons.module';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './app.custom-reuse-strategy';
import { HttpService } from './commons/app-services/http-service';
import { MessageService } from './commons/app-services/message-service';
import { LoadingService } from './commons/app-services/loading-service';
import { AuthGuard } from './commons/app-services/auth-guard.service';
import { AuthService } from './commons/app-services/auth-service';
import { LogService } from './commons/app-services/log-service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TokenService } from './commons/app-services/token-service';

// 为AOT准备
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule,  CommonsModule, 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    HttpService, MessageService, LoadingService, AuthGuard, AuthService, LogService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
