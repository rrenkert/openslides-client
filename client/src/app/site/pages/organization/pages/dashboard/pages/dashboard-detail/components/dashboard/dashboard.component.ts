import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/site/base/base.component';
import { MeetingControllerService } from 'src/app/site/pages/meetings/services/meeting-controller.service';
import { MEETING_LIST_SUBSCRIPTION, ViewMeeting } from 'src/app/site/pages/meetings/view-models/view-meeting';
import { OrganizationService } from 'src/app/site/pages/organization/services/organization.service';
import { ComponentServiceCollectorService } from 'src/app/site/services/component-service-collector.service';
import { OperatorService } from 'src/app/site/services/operator.service';
import { ThemeService } from 'src/app/site/services/theme.service';

@Component({
    selector: `os-dashboard`,
    templateUrl: `./dashboard.component.html`,
    styleUrls: [`./dashboard.component.scss`],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent extends BaseComponent {
    public get noMeetingsToShow(): boolean {
        return (
            !this.previousMeetings?.length &&
            !this.currentMeetings.length &&
            !this.futureMeetings.length &&
            !this.noDateMeetings.length
        );
    }

    public get isDarkModeObservable(): Observable<boolean> {
        return this.themeService.isDarkModeObservable;
    }

    public get organizationDescription(): string {
        return this.orgaService.organization?.description;
    }

    public ready: boolean = false;

    public previousMeetings: ViewMeeting[] = [];
    public currentMeetings: ViewMeeting[] = [];
    public futureMeetings: ViewMeeting[] = [];
    public noDateMeetings: ViewMeeting[] = [];

    public constructor(
        componentServiceCollector: ComponentServiceCollectorService,
        protected override translate: TranslateService,
        private orgaService: OrganizationService,
        private meetingRepo: MeetingControllerService,
        private themeService: ThemeService,
        private operator: OperatorService
    ) {
        super(componentServiceCollector, translate);
        super.setTitle(`Calendar`);
        this.loadMeetings();

        this.modelRequestService
            .waitSubscriptionReady(MEETING_LIST_SUBSCRIPTION)
            .then(() => {
                this.ready = true;
            })
            .catch(e => {
                console.error(e);
                this.ready = true;
            });
    }

    public getHeightByMeetings(meetings: ViewMeeting[]): string {
        let height = 0;
        if (meetings.length === 0) {
            return ``;
        } else if (meetings.length > 3) {
            height = 240;
        } else {
            height = meetings.length * 60;
        }
        return `${height}px`;
    }

    private loadMeetings(): void {
        this.subscriptions.push(
            this.meetingRepo.getViewModelListObservable().subscribe(meetings => {
                const filteredMeetings = meetings.filter(
                    meeting => this.operator.isInMeeting(meeting.id) || this.operator.isSuperAdmin
                );
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                this.noDateMeetings = filteredMeetings.filter(meeting => !meeting.start_time && !meeting.end_time);
                this.previousMeetings = filteredMeetings
                    .filter(meeting => (meeting.endDate as Date) < currentDate)
                    .sort((a, b) => b.end_time - a.end_time);
                this.futureMeetings = filteredMeetings
                    .filter(meeting => (meeting.startDate as Date) > currentDate)
                    .sort((a, b) => a.end_time - b.end_time);
                this.currentMeetings = filteredMeetings.filter(
                    meeting => (meeting.endDate as Date) >= currentDate && (meeting.startDate as Date) <= currentDate
                );
            })
        );
    }
}
