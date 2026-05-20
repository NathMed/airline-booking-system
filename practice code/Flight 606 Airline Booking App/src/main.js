import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'notyf/notyf.min.css';
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

//  Public Pages 
import HomePage from "./pages/Home.vue";
import HelpPage from "./pages/Help.vue";

//  Authentication 
import LoginPage from "./pages/Login.vue";
import RegisterPage from "./pages/Register.vue";
import LogoutPage from "./pages/Logout.vue";

//  Booking Flow 
import FlightResultsPage from "./pages/FlightResults.vue";
import SeatSelectionPage from "./pages/SeatSelection.vue";
import PassengerDetailsPage from "./pages/PassengerDetails.vue";
import PaymentPage from "./pages/Payment.vue";
import ConfirmBookingPage from "./pages/ConfirmBooking.vue";

//  Guest 
import GuestBookingLookupPage from "./pages/GuestBookingLookup.vue";

//  Authenticated User Space 
import UserProfilePage from "./pages/UserProfile.vue";
import MyBookingsPage from "./pages/MyBookings.vue";
import MyItineraryPage from "./pages/MyItinerary.vue";
import MyNotificationsPage from "./pages/MyNotifications.vue";

//  Admin 
import AdminDashboardPage from "./pages/AdminDashboard.vue";
import AdminFlightsPage from "./pages/AdminFlights.vue";
import AdminAirportsPage from "./pages/AdminAirports.vue";
import AdminAirplanesPage from "./pages/AdminAirplanes.vue";
import AdminBookingsPage from "./pages/AdminBookings.vue";
import AdminUsersPage from "./pages/AdminUsers.vue";
import AdminPassengersPage from "./pages/AdminPassengers.vue";

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    //  Public 
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/help',
      name: 'Help',
      component: HelpPage
    },

    //  Authentication 
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LogoutPage
    },

    //  Booking Flow 
    {
      path: '/flights',
      name: 'FlightResults',
      component: FlightResultsPage
    },
    {
      path: '/seat-selection',
      name: 'SeatSelection',
      component: SeatSelectionPage
    },
    {
      path: '/passenger-details',
      name: 'PassengerDetails',
      component: PassengerDetailsPage
    },
    {
      path: '/payment',
      name: 'Payment',
      component: PaymentPage
    },
    {
      path: '/booking-confirmation',
      name: 'ConfirmBooking',
      component: ConfirmBookingPage
    },

    //  Guest 
    {
      path: '/guest/booking-lookup',
      name: 'GuestBookingLookup',
      component: GuestBookingLookupPage
    },

    //  Authenticated User Space 
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfilePage
    },
    {
      path: '/my-bookings',
      name: 'MyBookings',
      component: MyBookingsPage
    },
    {
      path: '/my-itinerary',
      name: 'MyItinerary',
      component: MyItineraryPage
    },
    {
      path: '/my-notifications',
      name: 'MyNotifications',
      component: MyNotificationsPage
    },

    //  Admin 
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboardPage
    },
    {
      path: '/admin/flights',
      name: 'AdminFlights',
      component: AdminFlightsPage
    },
    {
      path: '/admin/airports',
      name: 'AdminAirports',
      component: AdminAirportsPage
    },
    {
      path: '/admin/airplanes',
      name: 'AdminAirplanes',
      component: AdminAirplanesPage
    },
    {
      path: '/admin/bookings',
      name: 'AdminBookings',
      component: AdminBookingsPage
    },
    {
      path: '/admin/users',
      name: 'AdminUsers',
      component: AdminUsersPage
    },
    {
      path: '/admin/passengers',
      name: 'AdminPassengers',
      component: AdminPassengersPage
    },

  ],
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');