import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-privacy-policy',
  imports: [CommonModule, FormsModule],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.css'
})
export class PrivacyPolicy {
  effectiveDate = '04 de agosto de 2025';
  dataController = {
    name: 'Decola Trips Ltda.',
    email: 'dpo@decolatrips.com.br'
  };

  dataTypesCollected = [
    { type: 'Dados cadastrais', examples: 'Nome completo, CPF, data de nascimento, endereço' },
    { type: 'Dados de contato', examples: 'E-mail, telefone, endereço postal' },
    { type: 'Dados de pagamento', examples: 'Informações de cartão de crédito (criptografadas), histórico de transações' },
    { type: 'Dados de viagem', examples: 'Destinos, datas, preferências, documentos de viagem' },
    { type: 'Dados de navegação', examples: 'Endereço IP, cookies, páginas visitadas' }
  ];

  purposes = [
    'Processar reservas e fornecer os serviços contratados',
    'Enviar confirmações e atualizações sobre viagens',
    'Melhorar nossos serviços e experiência do usuário',
    'Prevenir fraudes e aumentar a segurança',
    'Cumprir obrigações legais',
    'Enviar ofertas personalizadas (com consentimento)'
  ];
}

