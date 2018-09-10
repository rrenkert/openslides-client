import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'os-projector',
    templateUrl: './projector.component.html',
    styleUrls: ['./projector.component.css']
})
export class ProjectorComponent extends BaseComponent implements OnInit {
    public constructor(protected titleService: Title) {
        super(titleService);
    }

    public ngOnInit(): void {
        super.setTitle('Projector');
    }
}
