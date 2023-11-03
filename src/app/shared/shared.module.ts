import { NgModule } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorInterceptor } from './interceptors/author.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderModule } from './components/loader/loader.module';
import { ToastModule } from './components/toast/toast.module';

const isMSIE = window.navigator.userAgent.includes('MSIE');

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: isMSIE ? HashLocationStrategy : PathLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  declarations: [],
  exports: [LoaderModule, ToastModule],
})
export class SharedModule {}
