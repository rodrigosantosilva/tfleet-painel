import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideNativeDateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS  } from '@angular/material/core';
import { MY_DATE_FORMATS } from './types/date-formats';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
              provideRouter(routes), 
              provideAnimations(),
              provideToastr(), 
              provideHttpClient(withFetch()), 
              provideAnimationsAsync(),   
              provideNativeDateAdapter(),           
              provideClientHydration(withEventReplay()),
             { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
             { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
            ]
};
