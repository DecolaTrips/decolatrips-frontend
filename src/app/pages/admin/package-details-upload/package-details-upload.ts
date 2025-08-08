import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../../../services/imageService';
import { TravelPackageService } from '../../../services/TravelPackageService';


@Component({
  selector: 'app-package-details-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './package-details-upload.html',
  styleUrls: ['./package-details-upload.css']
})

export class PackageDetailsUpload implements OnInit {
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
      this.pacotes = data.content || data;
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
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
          this.form.reset();
          this.selectedFile = null;
          this.previewUrl = null;
        },
        error: (err: any) => console.error('Erro ao enviar imagem:', err)
      });
    }
  }
}


