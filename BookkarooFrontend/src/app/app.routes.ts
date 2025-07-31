import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ShowDetails } from './components/show-details/show-details';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { NewVenue } from './components/new-venue/new-venue';
import { ShowVenue } from './components/show-venue/show-venue';
import { EditVenue } from './components/edit-venue/edit-venue';
import { DeleteVenue } from './components/delete-venue/delete-venue';
import { BookingManagementComponent } from './components/booking-management/booking-management.component';
import { ViewSlots } from './components/view-slots/view-slots';
import { UserBooking } from './components/user-booking/user-booking';
import { Payment } from './components/payment/payment';
import { unauthorisedGuard } from './guadrds/unauthorised-guard';
import { OwnerDashboard } from './components/owner-dashboard/owner-dashboard';

export const routes: Routes = [
    {path:'navbar', component:Navbar},
    {path:'login', component:Login},
    {path:'register',component:Register},
    //{path:'show-details', component:ShowDetails,canActivate:[unauthorisedGuard]},
    {path:'forgot-password', component:ForgotPassword},
    {path:'add-venue',component:NewVenue,canActivate:[unauthorisedGuard]},
    {path:'show-venues',component:ShowVenue,canActivate:[unauthorisedGuard]},
    {path:'edit-venue/:id',component:EditVenue,canActivate:[unauthorisedGuard]},
    {path:'delete-venue/:id',component:DeleteVenue,canActivate:[unauthorisedGuard]},
    {path:'slot-management/:venueid',component:BookingManagementComponent,canActivate:[unauthorisedGuard]},
    {path:'view-slots',component:ViewSlots,canActivate:[unauthorisedGuard]},
    {path:'user-booking/:id',component:UserBooking},
    {path:'payment/:rateValue', component:Payment},
    {path:'Owner-Dashboard',component:OwnerDashboard,canActivate:[unauthorisedGuard]},
    {path:'about',component:About},
    {path:'home', component:Home},
    {path:'footer', component:Footer},
    {path:'',component:Home},
    {path:'**', redirectTo:'home', pathMatch:'full'},
    // {
    //     path: 'owner-dashboard',
    //     component: OwnerDashboard,
    //     canActivate: [unauthorisedGuard]
    //   }
      
    // {path:'register', loadComponent: () => import('./register/register').then(m => m.Register)},
    // {path:'', redirectTo:'login', pathMatch:'full'},
];
