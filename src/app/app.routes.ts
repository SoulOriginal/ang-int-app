import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@apps/libs-pages-index').then((m) => m.DRIVING_ROUTES),
  },
];
