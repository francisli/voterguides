import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ElectionsEditComponent, ElectionsIndexComponent,
  ElectionsNewComponent } from '.';
import { MeasuresEditComponent, MeasuresNewComponent } from './measures';

const routes: Routes = [
  {
    path: 'elections',
    component: ElectionsIndexComponent,
    data: { title: 'Elections' },
    children: [
      {
        path: 'new',
        component: ElectionsNewComponent,
        data: { title: 'New Election' }
      },
      {
        path: ':election_id',
        component: ElectionsEditComponent,
        data: { title: 'Edit Election' },
        children: [
          {
            path: 'measures/new',
            component: MeasuresNewComponent,
            data: { title: 'New Measure' }
          },
          {
            path: 'measures/:measure_id',
            component: MeasuresEditComponent,
            data: { title: 'Edit Measure' }
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ElectionsRoutingModule {}
