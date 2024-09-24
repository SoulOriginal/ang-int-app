import { InjectionToken } from '@angular/core';

import { ScreenBreakpoints } from '../models/screen-breakpoints.models';


export const SCREEN_BREAKPOINTS_TOKEN = new InjectionToken<ScreenBreakpoints>('Список Screen Breakpoints', {
  factory: () => ({
    xs: ['(max-width:480px)'],
    sm: ['(min-width:481px) and (max-width:1023px)'],
    md: ['(min-width:1024px) and (max-width:1279px)'],
    lg: '(min-width:1280px)',
  }),
});
