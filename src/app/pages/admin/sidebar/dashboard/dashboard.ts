import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,NgChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#1E1E1E',
        }
      }
    }
  };

  barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr'],
    datasets: [
      { data: [20, 40, 60, 80], label: 'Pacotes', backgroundColor: '#F59E0B' }
    ]
  };

  lineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr'],
    datasets: [
      {
        data: [35, 50, 70, 100],
        label: 'Receita',
        fill: false,
        borderColor: '#1E1E1E', // linha preta
        pointBackgroundColor: '#F59E0B', // pontos laranja
        pointBorderColor: '#F59E0B',
        tension: 0.4
      }
    ]
  };

  pieChartData: ChartData<'pie'> = {
    labels: ['Nacionais', 'Internacionais'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#1E1E1E', '#F59E0B'],
      }
    ]
  };

  doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Reservadas', 'Canceladas', 'Pendentes'],
    datasets: [
      {
        data: [50, 20, 30],
        backgroundColor: ['#F59E0B', '#EF4444', '#1E1E1E'],
      }
    ]
  };
}



