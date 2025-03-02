import { ComponentPortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Constructable } from 'src/app/domain/interfaces/constructable';

import { BannerDefinition, BannerService } from '../../services/banner.service';

@Component({
    selector: `os-banner`,
    templateUrl: `./banner.component.html`,
    styleUrls: [`./banner.component.scss`]
})
export class BannerComponent {
    public readonly activeBanners: Observable<BannerDefinition[]>;

    public constructor(bannerService: BannerService) {
        this.activeBanners = bannerService.getActiveBannersObservable();
    }

    public createComponentPortal(component: Constructable): ComponentPortal<any> {
        return new ComponentPortal(component);
    }
}
