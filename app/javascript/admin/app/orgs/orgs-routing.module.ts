import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrgsEditComponent, OrgsIndexComponent, OrgsNewComponent } from '.';

const routes: Routes = [
  {
    path: 'orgs',
    component: OrgsIndexComponent,
    data: { title: 'Orgs' },
    children: [
      {
        path: 'new',
        component: OrgsNewComponent,
        data: { title: 'New Org' }
      },
      {
        path: ':org_id',
        component: OrgsEditComponent,
        data: { title: 'Edit Org' },
    //     children: [
    //       {
    //         path: 'picks/new',
    //         component: PicksNewComponent,
    //         data: { title: 'New Pick' }
    //       },
    //       {
    //         path: 'picks/:pick_id',
    //         component: PicksEditComponent,
    //         data: { title: 'Edit Pick' }
    //       }
    //     ]
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
export class OrgsRoutingModule {}
