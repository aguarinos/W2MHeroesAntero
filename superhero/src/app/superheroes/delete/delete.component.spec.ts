// delete.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteComponent } from './delete.component';
import { SuperheroesService } from 'src/app/services/superheroes.service';
import { of } from 'rxjs';

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;
  let mockDialogRef: MatDialogRef<DeleteComponent>;
  let mockSuperheroesService: jasmine.SpyObj<SuperheroesService>;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj(['close']);
    mockSuperheroesService = jasmine.createSpyObj('SuperheroesService', [
      'deleteSuperHeroe',
    ]);
    TestBed.configureTestingModule({
      declarations: [DeleteComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: 42 }, // Example data value
        { provide: SuperheroesService, useValue: mockSuperheroesService },
      ],
    });
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteSuperHeroe on button click', () => {
    const spy = mockSuperheroesService.deleteSuperHeroe.and.returnValue(of());
    component.onSiClick();
    expect(spy).toHaveBeenCalledWith('42');
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
