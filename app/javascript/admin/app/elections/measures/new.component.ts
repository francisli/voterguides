import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { NavigationService } from '../../../../shared/services';

@Component({
  templateUrl: './new.component.html',
})
export class MeasuresNewComponent {
  protected electionId: string = null;

  constructor(private route: ActivatedRoute, private navigation: NavigationService) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.electionId = params.get('election_id')
    });
  }

  onCreate() {
    this.navigation.backTo(`/elections/${this.electionId}`);
  }
}
