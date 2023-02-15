import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';

const allModules = [
  TableModule, ButtonModule, TooltipModule, ToastModule, InputTextModule,
  MultiSelectModule, DialogModule, DropdownModule, BadgeModule
];

@NgModule({
  exports: allModules,
  imports: allModules
})

export class PrimeNGModule { }
