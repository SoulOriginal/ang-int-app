import { Provider } from '@angular/core';
import {
  ScreenBreakpoints,
  SCREEN_BREAKPOINTS_TOKEN,
} from '@apps/shared-tokens-screen-breakpoints';

const screenBreakpoints: ScreenBreakpoints = {
  xs: ['(max-width:480px)'],
  sm: ['(min-width:481px) and (max-width:1023px)'],
  md: ['(min-width:1024px) and (max-width:1279px)'],
  lg: '(min-width:1280px)',
};

const SCREEN_BREAKPOINTS_TOKEN_PROVIDER: Provider = {
  provide: SCREEN_BREAKPOINTS_TOKEN,
  useValue: screenBreakpoints,
};

export const APP_MODULE_PROVIDERS = [SCREEN_BREAKPOINTS_TOKEN_PROVIDER];
