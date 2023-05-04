import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  userData: any;

  appPages = [
    { title: 'Home', url: '', icon: 'home' },
    { title: 'About Us', url: '/about-us', icon: 'mail' },
    { title: 'Download', url: '/folder/download', icon: 'download-outline' },
    {
      title: 'Payment Info',
      url: '/folder/payment-info',
      icon: 'information-circle-outline',
    },
    { title: 'Logout', url: '/folder/logout', icon: 'log-out-outline' },
    { title: 'Login', url: '/signup', icon: 'log-out-outline' },
    { title: 'Signup', url: '/signup', icon: 'log-out-outline' }
  ];

  cloneAppPages = [
    { title: 'Home', url: '', icon: 'home' },
    { title: 'About Us', url: '/about-us', icon: 'mail' },
    { title: 'Download', url: '/folder/download', icon: 'download-outline' },
    {
      title: 'Payment Info',
      url: '/folder/payment-info',
      icon: 'information-circle-outline',
    },
    { title: 'Logout', url: '/folder/logout', icon: 'log-out-outline' },
    { title: 'Login', url: '/signup', icon: 'log-out-outline' },
    { title: 'Signup', url: '/signup', icon: 'log-out-outline' }
  ];

  mainPageCategory: any[] = [
    {
      title: 'Calculator',
      icon: '../../assets/imgs/calculator.png',
      route: 'calculator',
    },
    {
      title: 'Courses',
      icon: '../../assets/imgs/courses.png',
      route: 'courses',
    },
    {
      title: 'Income/Expense Manager',
      icon: '../../assets/imgs/iemanager.png',
      route: 'income-expense',
    },
    {
      title: 'Appointment Booking',
      icon: '../../assets/imgs/appointment.png',
      route: 'appointment-booking',
    },
  ];

  cloneMainPageCategory: any[] = [
    {
      title: 'Calculator',
      icon: '../../assets/imgs/calculator.png',
      route: 'calculator',
    },
    {
      title: 'Courses',
      icon: '../../assets/imgs/courses.png',
      route: 'courses',
    },
    {
      title: 'Income/Expense Manager',
      icon: '../../assets/imgs/iemanager.png',
      route: 'income-expense',
    },
    {
      title: 'Appointment Booking',
      icon: '../../assets/imgs/appointment.png',
      route: 'appointment-booking',
    },
  ];

  constructor(
  ) {}

   validateEmail(email: any) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    }

    generateRandomID() {
      return Math.floor(Math.random() * 999999)
    }



  }