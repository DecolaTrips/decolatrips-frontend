import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormsModule } from '@angular/forms';
import { TravelPackageService } from '../../services/TravelPackageService';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailabilityService } from '../../services/availabilityService';

@Component({
  selector: 'app-travel-package-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [FormBuilder],
  templateUrl: './travel-package-form.html',
})

export class TravelPackageForm implements OnInit {
  packages: any[] = [];
  form: FormGroup;
  packageId: number | null = null;
  activeTab: number = 1;

  constructor(
     private fb: FormBuilder ,
     private travelPackageService: TravelPackageService,
     private availabilityService: AvailabilityService,
     private router: Router,
     private route: ActivatedRoute) {

      this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      place: [''],
      country: [''],
      region: [''],
      typeTrip: [''],
      environment: [''],
      pdfItinerary: [''],
      durationDays: [null],
      valorBase: [null, Validators.required],
      availability: this.fb.array([])
    });
  }

   ngOnInit() {
    this.route.paramMap.subscribe(params => {
    const idParam = params.get('id');
    if (idParam) {
      this.packageId = +idParam;
      this.loadPackage(this.packageId);
    }
  });
    this.travelPackageService.getAllTravelPackages().subscribe({
      next: (data) => {
        this.packages = data;
      },
      error: (err) => {
        console.error('Erro ao buscar pacotes:', err);
      }
    });
  }

submit() {
  if (this.form.valid) {
    const dto = this.form.value;
    const images = this.selectedImages ?? [];

    if (this.packageId) {
      // Atualizar pacote
      this.travelPackageService.updateTravelPackage(this.packageId, dto, images).subscribe({
        next: () => {
          alert('Pacote atualizado com sucesso!');
          this.router.navigate(['/admin/packages']);
        },
        error: err => {
          console.error('Erro ao atualizar pacote', err);
          alert('Erro ao atualizar pacote: ' + err.message);
        }
      });
    } else {
      // Criar pacote
      this.travelPackageService.createTravelPackage(dto, images).subscribe({
        next: (res) => {
          const packageId = res.id;
          const availabilityData = this.form.value.availability;

          if (availabilityData && availabilityData.length > 0) {
            this.availabilityService.createAvailabilities(packageId, availabilityData).subscribe({
              next: () => {
                if (confirm('Pacote criado com sucesso! Deseja cadastrar um novo pacote?')) {
                  this.form.reset();
                  this.selectedImages = null;
                } else {
                  this.router.navigate(['/admin/packages']);
                }
              },
              error: err => {
                console.error("Erro ao salvar disponibilidades", err);
                alert("Pacote criado, mas houve erro ao salvar disponibilidades.");
              }
            });
          } else {
            if (confirm('Pacote criado com sucesso! Deseja cadastrar um novo pacote?')) {
              this.form.reset();
              this.selectedImages = null;
            } else {
              this.router.navigate(['/admin/packages']);
            }
          }
        },
        error: err => {
          console.error("Erro ao criar pacote", err);
          alert("Erro ao criar pacote: " + err.message);
        }
      });
    }

  } else {
    alert('Por favor, preencha os campos obrigatórios.');
  }
}



selectedImages: File[] | null = null;

onImageSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) {
    this.selectedImages = null;
    return;
  }
  this.selectedImages = Array.from(input.files);
}

get availabilityForm(): FormArray {
  return this.form.get('availability') as FormArray;
}

addAvailability(): void {
  this.availabilityForm.push(
    this.fb.group({
      dateIn: ['', Validators.required],
      dateOut: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      vacancyAvailability: [null],
      status: ['Ativo']
    })
  );
}

removeAvailability(index: number): void {
  this.availabilityForm.removeAt(index);
}
activeSection: string = 'view';

loadPackage(id: number): void {
  this.travelPackageService.getPackageById(id).subscribe({
    next: (data: any) => {
      // Preencher os campos principais do formulário
      this.form.patchValue({
        title: data.title,
        description: data.description,
        place: data.place,
        country: data.country,
        region: data.region,
        typeTrip: data.typeTrip,
        environment: data.environment,
        pdfItinerary: data.pdfItinerary,
        durationDays: data.durationDays,
        valorBase: data.valorBase
      });

      // Limpar e preencher availability
      this.availabilityForm.clear();
      if (data.availability && Array.isArray(data.availability)) {
        data.availability.forEach((avail: any) => {
          this.availabilityForm.push(
            this.fb.group({
              dateIn: [avail.dateIn, Validators.required],
              dateOut: [avail.dateOut, Validators.required],
              price: [avail.price, [Validators.required, Validators.min(0)]],
              vacancyAvailability: [avail.vacancyAvailability],
              status: [avail.status || 'Ativo']
            })
          );
        });
      }
    },
    error: (err) => {
      console.error('Erro ao carregar pacote:', err);
      alert('Não foi possível carregar os dados do pacote para edição.');
    }
  });
}
}

