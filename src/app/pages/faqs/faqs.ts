import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faqs',
  imports: [CommonModule, FormsModule],
  templateUrl: './faqs.html',
  styleUrl: './faqs.css'
})
export class Faqs {
faqs = [
    {
      question: 'Como faço para reservar um pacote de viagem?',
      answer: 'Basta selecionar o pacote desejado, escolher as datas e completar o processo de pagamento em nosso site.',
      open: false
    },
    {
      question: 'Quais são as formas de pagamento aceitas?',
      answer: 'Aceitamos cartões de crédito (Visa, Mastercard, American Express), Pix e boleto bancário.',
      open: false
    },
    {
      question: 'É possível cancelar ou alterar uma reserva?',
      answer: 'Sim, é possível cancelar uma reserva, mas não é possível alterá-la, uma vez realizada.',
      open: false
    },
    {
      question: 'Quais documentos preciso para viajar?',
      answer: 'Depende do destino. Para viagens nacionais, RG ou CNH válidos. Internacionais: passaporte e vistos quando necessários. Consulte o regulamento do país que está indo visitar.',
      open: false
    },
    {
      question: 'Os pacotes incluem seguro viagem?',
      answer: 'A maioria dos nossos pacotes internacionais inclui seguro básico. Para nacionais, o seguro é opcional e pode ser contratado separadamente.',
      open: false
    },
    {
      question: 'Como funciona o suporte durante a viagem?',
      answer: 'Oferecemos suporte 24/7 através de nosso número de emergência, disponível em todos os materiais de confirmação da viagem.',
      open: false
    }
  ];

  toggleFAQ(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }
}