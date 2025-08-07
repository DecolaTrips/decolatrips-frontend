import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fraud-prevention',
  imports: [FormsModule, CommonModule],
  templateUrl: './fraud-prevention.html',
  styleUrl: './fraud-prevention.css'
})
export class FraudPrevention {
  warningSigns = [
    {
      title: 'Ofertas Irresistíveis',
      description: 'Desconfie de promoções com descontos absurdamente altos (acima de 70% do valor de mercado).',
      icon: '💰'
    },
    {
      title: 'Pagamentos fora do sistema',
      description: 'Nunca aceite fazer pagamentos via transferência bancária direta ou em contas pessoais.',
      icon: '💳'
    },
    {
      title: 'Links suspeitos',
      description: 'Não clique em links recebidos por e-mail ou WhatsApp que não sejam do domínio @decolatrips.com.br.',
      icon: '🔗'
    },
    {
      title: 'Pressão por decisão',
      description: 'Desconfie de quem diz que a oferta é por "tempo limitado" ou "últimas vagas" para pressionar sua decisão.',
      icon: '⏱️'
    }
  ];

  contactChannels = [
    {
      name: 'WhatsApp Oficial',
      value: '(11) 98765-4321',
      icon: '💬'
    },
    {
      name: 'E-mail de Segurança',
      value: 'seguranca@decolatrips.com.br',
      icon: '✉️'
    }
  ];
}

