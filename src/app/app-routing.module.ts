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
    path: 'course-details',
    loadChildren: () => import('./pages/course-details/course-details.module').then( m => m.CourseDetailsPageModule)
  },
  {
    path: 'smart-form',
    loadChildren: () => import('./pages/smart-form/smart-form.module').then( m => m.SmartFormPageModule)
  },
  {
    path: 'course-inquiry',
    loadChildren: () => import('./pages/course-inquiry/course-inquiry.module').then( m => m.CourseInquiryPageModule)
  },
  {
    path: 'folder/payment-info',
    loadChildren: () => import('./pages/payment-info/payment-info.module').then( m => m.PaymentInfoPageModule)
  },
  {
    path: 'document-upload',
    loadChildren: () => import('./pages/document-upload/document-upload.module').then( m => m.DocumentUploadPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  }








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
