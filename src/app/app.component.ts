import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreSvgIconsModule } from '@apps/libs-shared-core-svg-icons';
import { APP_MODULE_PROVIDERS } from './app.providers';

@Component({
  standalone: true,
  imports: [RouterModule, CoreSvgIconsModule],
  providers: [APP_MODULE_PROVIDERS],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'apps';
}
