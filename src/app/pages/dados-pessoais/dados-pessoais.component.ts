import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar-t2/navbar.component';
import { Footer } from '../../components/footer/footer';
import { UserDataService, IUserData } from '../../services/user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dados-pessoais',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, Footer],
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css']
})
export class DadosPessoaisComponent implements OnInit, OnDestroy {
  userData: IUserData = {
    id: 1,
    name: '',
    email: '',
    document: '',
    phone: '',
    birthDate: ''
  };

  // status 
  isEditing = false;
  isLoading = false;
  isSaving = false;
  originalUserData: IUserData = { ...this.userData };

  formErrors: { [key: string]: string } = {};

  // sucesso/error
  successMessage = '';
  errorMessage = '';

  private subscription: Subscription = new Subscription();

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadUserData(): void {
    this.isLoading = true;
    this.clearMessages();
    
    const subscription = this.userDataService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        this.originalUserData = { ...data };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.errorMessage = 'Erro ao carregar dados do usuário';
        this.isLoading = false;
      }
    });
    
    this.subscription.add(subscription);
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.saveUserData();
    } else {
      this.originalUserData = { ...this.userData };
    }
    this.isEditing = !this.isEditing;
    this.clearMessages();
  }

  cancelEdit(): void {
    this.userData = { ...this.originalUserData };
    this.isEditing = false;
    this.formErrors = {};
    this.clearMessages();
  }

  saveUserData(): void {
    const validation = this.userDataService.validateUserData(this.userData);
    
    if (!validation.isValid) {
      this.formErrors = {};
      validation.errors.forEach(error => {
        if (error.includes('Nome')) this.formErrors['name'] = error;
        if (error.includes('Email')) this.formErrors['email'] = error;
        if (error.includes('CPF')) this.formErrors['document'] = error;
        if (error.includes('Telefone')) this.formErrors['phone'] = error;
        if (error.includes('Data de nascimento')) this.formErrors['birthDate'] = error;
      });
      return;
    }

    this.isSaving = true;
    this.clearMessages();

    const subscription = this.userDataService.updateUserData(this.userData).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.userData = response.data;
          this.originalUserData = { ...response.data };
          this.isEditing = false;
          this.isSaving = false;
          this.successMessage = response.message || 'Dados salvos com sucesso!';
          this.formErrors = {};
          
          // fecha mensagem de sucesso depois de 5s
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        } else {
          this.errorMessage = response.message || 'Erro ao salvar os dados';
          this.isSaving = false;
        }
      },
      error: (error) => {
        console.error('Error saving user data:', error);
        this.errorMessage = 'Erro ao salvar os dados. Tente novamente.';
        this.isSaving = false;
        
        // fecha mensagem de erro depois de 5s
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });

    this.subscription.add(subscription);
  }

  onDocumentChange(event: any): void {
    const formattedDocument = this.userDataService.formatDocument(event.target.value);
    this.userData.document = formattedDocument;
    
    // arruma documento enquanto usuario digita
    if (this.formErrors['document']) {
      delete this.formErrors['document'];
    }
  }

  onPhoneChange(event: any): void {
    const formattedPhone = this.userDataService.formatPhone(event.target.value);
    this.userData.phone = formattedPhone;
    
    // arruma erro no telefone
    if (this.formErrors['phone']) {
      delete this.formErrors['phone'];
    }
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  hasError(fieldName: string): boolean {
    return !!this.formErrors[fieldName];
  }

  getError(fieldName: string): string {
    return this.formErrors[fieldName] || '';
  }
}
