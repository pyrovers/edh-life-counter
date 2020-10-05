import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountersComponent } from './counters/counters.component';
import { CountersRoutingModule } from './counters-routing.module';

@NgModule({
  declarations: [CountersComponent],
  imports: [CommonModule, CountersRoutingModule],
})
export class CountersModule {}
