import { Component } from '@angular/core';
import { BaseModelRequestHandlerComponent } from 'src/app/site/base/base-model-request-handler.component';

import { getAgendaSubscriptionConfig } from '../../../agenda/config/model-subscription';
import { getAssignmentSubscriptionConfig } from '../../config/model-subscription';

const ASSIGNMENT_SUBSCRIPTION = `assignment`;

@Component({
    selector: `os-assignment-main`,
    templateUrl: `./assignment-main.component.html`,
    styleUrls: [`./assignment-main.component.scss`]
})
export class AssignmentMainComponent extends BaseModelRequestHandlerComponent {
    protected override onNextMeetingId(id: number | null): void {
        if (id) {
            this.subscribeTo(
                getAssignmentSubscriptionConfig(id, () => this.hasMeetingIdChangedObservable()),
                getAgendaSubscriptionConfig(id, () => this.hasMeetingIdChangedObservable())
            );
        }
    }
}
