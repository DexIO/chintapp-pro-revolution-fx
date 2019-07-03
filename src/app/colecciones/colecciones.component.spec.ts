import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ColeccionesComponent} from './colecciones.component';

describe('ColeccionesComponent', () => {
    let component: ColeccionesComponent;
    let fixture: ComponentFixture<ColeccionesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ColeccionesComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColeccionesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
