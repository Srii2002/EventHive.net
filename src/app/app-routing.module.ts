import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Register } from './components/register/register';
import { EventsComponent } from './components/events/events';
import { EventDetailComponent } from './components/event-detail/event-detail';
import { TicketsComponent } from './components/tickets/tickets';
import { AdminComponent } from './components/admin/admin';
import { AdminGuard } from './guards/admin-guard';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}