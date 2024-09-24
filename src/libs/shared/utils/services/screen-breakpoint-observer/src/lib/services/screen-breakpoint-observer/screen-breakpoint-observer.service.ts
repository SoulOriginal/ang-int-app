import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { SCREEN_BREAKPOINTS_TOKEN } from '@apps/shared-tokens-screen-breakpoints';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';

export enum Breakpoints {
  'XS' = 'xs',
  'SM' = 'sm',
  'MD' = 'md',
  'LG' = 'lg',
  'XL' = 'xl',
}

@Injectable({
  providedIn: 'root',
})
export class ScreenBreakpointObserverService implements OnDestroy {
  private _screenSizeObserver$ = new BehaviorSubject<Breakpoints[]>([
    Breakpoints.XS,
  ]);

  public screenSizeObserver$ = this._screenSizeObserver$.pipe();
  public size$: Observable<'lg' | 'xs'> = this.screenSizeObserver$.pipe(
    map((breakpoints) => {
      switch (true) {
        case breakpoints.includes(Breakpoints.SM):
          return 'lg';
        default:
          return 'xs';
      }
    })
  );

  private readonly destroy$ = new Subject<void>();

  private screenBreakpoints = inject(SCREEN_BREAKPOINTS_TOKEN);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.initObservers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private initObservers() {
    if (this.screenBreakpoints.xs) {
      this.breakpointObserver
        .observe(this.screenBreakpoints.xs)
        .pipe(
          filter(({ matches }: { matches: boolean }) => matches === true),
          tap(() => this._screenSizeObserver$.next([Breakpoints.XS])),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }

    if (this.screenBreakpoints.sm) {
      this.breakpointObserver
        .observe(this.screenBreakpoints.sm)
        .pipe(
          filter(({ matches }: { matches: boolean }) => matches === true),
          tap(() =>
            this._screenSizeObserver$.next([Breakpoints.XS, Breakpoints.SM])
          ),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }

    if (this.screenBreakpoints.md) {
      this.breakpointObserver
        .observe(this.screenBreakpoints.md)
        .pipe(
          filter(({ matches }: { matches: boolean }) => matches === true),
          tap(() =>
            this._screenSizeObserver$.next([
              Breakpoints.XS,
              Breakpoints.SM,
              Breakpoints.MD,
            ])
          ),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }

    if (this.screenBreakpoints.lg) {
      this.breakpointObserver
        .observe(this.screenBreakpoints.lg)
        .pipe(
          filter(({ matches }: { matches: boolean }) => matches === true),
          tap(() =>
            this._screenSizeObserver$.next([
              Breakpoints.XS,
              Breakpoints.SM,
              Breakpoints.MD,
              Breakpoints.LG,
            ])
          ),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }

    if (this.screenBreakpoints.xl) {
      this.breakpointObserver
        .observe(this.screenBreakpoints.xl)
        .pipe(
          filter(({ matches }: { matches: boolean }) => matches === true),
          tap(() =>
            this._screenSizeObserver$.next([
              Breakpoints.XS,
              Breakpoints.SM,
              Breakpoints.MD,
              Breakpoints.LG,
              Breakpoints.XL,
            ])
          ),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }
}
