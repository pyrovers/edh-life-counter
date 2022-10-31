import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountersComponent } from './counters/counters.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CountersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountersRoutingModule {}
