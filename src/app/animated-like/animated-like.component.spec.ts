import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AnimatedLikeComponent} from './animated-like.component';

describe('AnimatedLikeComponent', () => {
    let component: AnimatedLikeComponent;
    let fixture: ComponentFixture<AnimatedLikeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AnimatedLikeComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnimatedLikeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
