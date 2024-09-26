import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlankingSnackBarService } from './services/blanking-snack-bar/blanking-snack-bar.service';
@NgModule({
  providers: [BlankingSnackBarService, MatSnackBar],
})
export class SharedUtilsServicesBlankingSnackBarModule {}
