import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../../../services/imageService';
import { TravelPackageService } from '../../../../services/TravelPackageService';


@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './finance.html',
  styleUrls: ['./finance.css']
})
export class Finance implements OnInit {
  form: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  pacotes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private imageService: ImageService,
    private travelPackageService: TravelPackageService
  ) {
    this.form = this.fb.group({
      packageId: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.travelPackageService.getAllTravelPackages().subscribe((data: any) => {
      this.pacotes = data.content;
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  submitForm(): void {
    if (this.form.valid && this.selectedFile) {
      const packageId = this.form.get('packageId')?.value;
      const description = this.form.get('description')?.value;

      this.imageService.uploadImage(packageId, this.selectedFile, description).subscribe({
        next: () => {
          alert('Imagem enviada com sucesso.');

          // Limpa formulário
          this.form.reset();
          this.selectedFile = null;
          this.previewUrl = null;
        },
        error: (err) => console.error('Erro ao enviar imagem:', err)
      });
    }
  }
}

