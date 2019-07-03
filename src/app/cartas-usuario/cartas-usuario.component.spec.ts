import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartasUsuarioComponent} from './cartas-usuario.component';

describe('CartasUsuarioComponent', () => {
    let component: CartasUsuarioComponent;
    let fixture: ComponentFixture<CartasUsuarioComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartasUsuarioComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartasUsuarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
