import { async, TestBed } from '@angular/core/testing';

import { SharedUtilsServicesScreenBreakpointObserverModule } from './shared-utils-services-screen-breakpoint-observer.module';

describe('SharedUtilsServicesScreenBreakpointObserverModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUtilsServicesScreenBreakpointObserverModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(SharedUtilsServicesScreenBreakpointObserverModule).toBeDefined();
  });
});
