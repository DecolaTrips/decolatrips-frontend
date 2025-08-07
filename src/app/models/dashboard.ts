
export interface MonthlyStat {
  month: string; // exemplo: "Jan", "Fev"
  total: number; // valores de receita ou viajantes
}

export interface TravelPackageDistribution {
  nacionais: number;
  internacionais: number;
}

export interface ReservationDistribution {
  Confirmado: number;
  Cancelado: number;
  Pendente: number;
}
