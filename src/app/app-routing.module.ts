import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'calculator',
    loadChildren: () => import('./pages/calculator/calculator.module').then( m => m.CalculatorPageModule)
  },
  {
    path: 'income-expense',
    loadChildren: () => import('./pages/income-expense/income-expense.module').then( m => m.IncomeExpensePageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'appointment-booking',
    loadChildren: () => import('./pages/appointment-booking/appointment-booking.module').then( m => m.AppointmentBookingPageModule)
  },
  {
    path: 'sip-calculator',
    loadChildren: () => import('./pages/sip-calculator/sip-calculator.module').then( m => m.SipCalculatorPageModule)
  },
  {
    path: 'loan-calculator',
    loadChildren: () => import('./pages/loan-calculator/loan-calculator.module').then( m => m.LoanCalculatorPageModule)
  },
  {
    path: 'insurance-calculator',
    loadChildren: () => import('./pages/insurance-calculator/insurance-calculator.module').then( m => m.InsuranceCalculatorPageModule)
  },
  {
    path: 'smart-form',
    loadChildren: () => import('./pages/smart-form/smart-form.module').then( m => m.SmartFormPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
