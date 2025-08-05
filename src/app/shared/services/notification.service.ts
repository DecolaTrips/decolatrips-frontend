import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  success(title: string, message: string): void {
    console.log(`✅ ${title}: ${message}`);
    // TODO: Implement actual notification system (toast, snackbar, etc.)
    alert(`${title}\n${message}`);
  }

  error(title: string, message: string): void {
    console.error(`❌ ${title}: ${message}`);
    // TODO: Implement actual notification system (toast, snackbar, etc.)
    alert(`${title}\n${message}`);
  }

  info(title: string, message: string): void {
    console.info(`ℹ️ ${title}: ${message}`);
    // TODO: Implement actual notification system (toast, snackbar, etc.)
    alert(`${title}\n${message}`);
  }

  warning(title: string, message: string): void {
    console.warn(`⚠️ ${title}: ${message}`);
    // TODO: Implement actual notification system (toast, snackbar, etc.)
    alert(`${title}\n${message}`);
  }
}