import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sobrenos',
  imports: [CommonModule, FormsModule],
  templateUrl: './sobrenos.html',
  styleUrl: './sobrenos.css'
})
export class Sobrenos {
  teamMembers = [
    {
      name: 'Carla Cristina de Jesus Albuquerque',
      role: 'Scrum Master',
      bio: 'MBTI: XXXX',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQFygVESqbjjwA/profile-displayphoto-shrink_400_400/B4EZdkrgkVH0Ak-/0/1749740821724?e=1756944000&v=beta&t=dBoWNW2f26yUvYSvUeAsV9-pFs1nlB0kuCMikDubsKY'
    },
    {
      name: 'Celline Bitencourt de Souza',
      role: 'Desenvolvedora Front-End',
      bio: 'MBTI: XXXX',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQFDkbCOsepnTQ/profile-displayphoto-shrink_400_400/B4DZd_f9.iGgAg-/0/1750190776811?e=1756944000&v=beta&t=FItGsbNytsy2S1Rpu8LF_QQhjteTxjqDMYIHciUJVn0'
    },
    {
      name: 'Davi Antonio dos Santos',
      role: 'Desenvolvedor Back-End',
      bio: 'MBTI: XXXX',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQG9Xs0nwFjEqg/profile-displayphoto-shrink_800_800/B4DZeA0unTHMAc-/0/1750212996086?e=1756944000&v=beta&t=uJqf_UhilFtOCpTyoP9c9_TmSkr59M0J73ENE80AIyY'
    },
    {
      name: 'Denise Korgiski de Oliveira',
      role: 'Desenvolvedora Back-End',
      bio: 'MBTI: XXXX',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQERXZ8pKCo0xA/profile-displayphoto-shrink_800_800/B4DZbcruWZIAAc-/0/1747459172545?e=1756944000&v=beta&t=vR863wu4znfaN0ZsAcOkpJwOYNdZhEQ0MQTG-dXvvs0'
    },
    {
      name: 'Guilherme de Magalhães Andrade',
      role: 'Desenvolvedor Back-End',
      bio: 'MBTI: XXXX',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQG2A5mM3GoZxw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1669972265844?e=1756944000&v=beta&t=DZ9otz4AAUz2-350jGzzV2SxvFOtFNyTTk-JsIsJmFo'
    },
    {
      name: 'Isabelle Brandão Garcia',
      role: 'Desenvolvedora Front-End',
      bio: 'MBTI: XXXX',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQGFPR4Jwp8BvQ/profile-displayphoto-shrink_800_800/B4DZWv1zZ6G8Ag-/0/1742411872497?e=1756944000&v=beta&t=ADzLfFFLADWgEWVD0nr74zYNcwbiDd3HM9ldLRDsZvs'
    },
    {
      name: 'Willians Henrique Santos Silva',
      role: 'Desenvolvedor Back-End',
      bio: 'MBTI: XXXX',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQG3QCGlamTJrA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1679961375824?e=1756944000&v=beta&t=7DFZeBIfJNfHuqDCaRjm2BvEvu9V5h-WDTa7Ua268zI'
    }
  ];

  stats = [
    { value: '10+', label: 'Anos de Experiência' },
    { value: '5.000+', label: 'Clientes Satisfeitos' },
    { value: '50+', label: 'Destinos Exclusivos' },
    { value: '24/7', label: 'Suporte ao Cliente' }
  ];
}
