import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { DashboardService } from '../../../../services/dashboardService';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,NgChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  constructor(private dashboardService: DashboardService) {}

  // Métricas
  totalPackages = 0;
  totalBookings = 0; 
  totalUsers = 0;    
  totalRevenue = 0;

  // Opções de gráfico
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#1E1E1E'
        }
      }
    }
  };

  // Dados dos gráficos
  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  pieChartData: ChartData<'pie'> = {
    labels: ['Nacionais', 'Internacionais'],
    datasets: []
  };
  doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Confirmada', 'Cancelado', 'Pendente'],
    datasets: []
  };

  ngOnInit(): void {
    const year = 2025;
    const quarter = 1;

    this.loadMetrics();

    this.dashboardService.getMonthlyIncome(year, quarter).subscribe(data => {
      this.lineChartData = {
        labels: data.map(d => d.month),
        datasets: [{
          data: data.map(d => d.total),
          label: 'Receita',
          borderColor: '#1E1E1E',
          fill: false,
          pointBackgroundColor: '#F59E0B',
          pointBorderColor: '#F59E0B',
          tension: 0.4
        }]
      };
    });

    this.dashboardService.getMonthlyTravelers(year, quarter).subscribe(data => {
      this.barChartData = {
        labels: data.map(d => d.month),
        datasets: [{
          data: data.map(d => d.total),
          label: 'Viajantes',
          backgroundColor: '#F59E0B'
        }]
      };
    });

    this.dashboardService.getTravelPackageDistribution().subscribe(data => {
      this.pieChartData = {
        labels: ['Nacionais', 'Internacionais'],
        datasets: [{
          data: [data.nacionais, data.internacionais],
          backgroundColor: ['#1E1E1E', '#F59E0B']
        }]
      };
    });

    this.dashboardService.getReservationDistribution().subscribe(data => {
      this.doughnutChartData = {
        labels: ['Confirmada', 'Cancelado', 'Pendente'],
        datasets: [{
          data: [data['Confirmada'], data['Cancelado'], data['Pendente']],
          backgroundColor: ['#F59E0B', '#EF4444', '#1E1E1E']
        }]
      };
    });
  }

  loadMetrics() {
  this.dashboardService.getDashboardMetrics().subscribe({
    next: (data) => {
      this.totalPackages = data.totalPackages;
      this.totalBookings = data.totalBookings;  // corrigido
      this.totalUsers = data.totalUsers;       
      this.totalRevenue = data.totalRevenue;
    },
    error: (err) => {
      console.error('Erro ao buscar métricas:', err);
    }
  });
}
}
