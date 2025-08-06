// src/app/components/mercadopago-payment/mercadopago-payment.component.ts
import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

declare var MercadoPago: any;

@Component({
  selector: 'app-mercadopago-payment',
  templateUrl: './mercadopago-payment.component.html',
  styleUrls: ['./mercadopago-payment.component.css']
})
export class MercadopagoPaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() amount: number = 0;
  @Input() traveler: any;
  @Output() paymentSuccess = new EventEmitter<any>();
  @Output() paymentError = new EventEmitter<any>();

  constructor() { }

  async ngAfterViewInit(): Promise<void> {
    const mp = new MercadoPago('TEST-ad6c3444-fb18-4edc-8c18-4ac36c0c7620', {
      locale: 'pt-BR'
    });

    const bricksBuilder = mp.bricks();

    const settings = {
      initialization: {
        amount: this.amount, // Use the input amount
        preferenceId: '<PREFERENCE_ID>',
        payer: {
          firstName: this.traveler?.firstName || '',
          lastName: this.traveler?.lastName || '',
          email: this.traveler?.email || '',
        }
      },
      customization: {
        visual: {
          style: {
            theme: 'default',
          }
        },
        paymentMethods: {
          creditCard: 'all',
          debitCard: 'all',
          ticket: 'all',
          bankTransfer: 'all',
          onboarding_credits: 'all',
          wallet_purchase: 'all',
          mercadoPago: 'all',
          atm: 'all',
          maxInstallments: 10,
        }
      },
      callbacks: {
        onReady: () => {
          console.log('Brick pronto');
        },
        onSubmit: ({ selectedPaymentMethod, formData }: any) => {
          return new Promise((resolve, reject) => {
            fetch('http://localhost:8080/api/payments', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                ...formData,
                amount: this.amount,
                traveler: this.traveler
              })
            })
              .then(response => response.json())
              .then(data => {
                console.log('Pagamento criado com sucesso', data);
                this.paymentSuccess.emit(data);
                resolve(data);
              })
              .catch(err => {
                console.error('Erro ao criar pagamento', err);
                this.paymentError.emit(err);
                reject();
              });
          });
        },
        onError: (error: any) => {
          console.error('Erro no Brick:', error);
          this.paymentError.emit(error);
        }
      }
    };

    await bricksBuilder.create('payment', 'paymentBrick_container', settings);
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if ((window as any).paymentBrickController) {
      (window as any).paymentBrickController.unmount();
    }
  }
}