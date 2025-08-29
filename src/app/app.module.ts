import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { EventsComponent } from './components/events/events';
import { EventDetailComponent } from './components/event-detail/event-detail';
import { TicketsComponent } from './components/tickets/tickets';
import { AdminComponent } from './components/admin/admin';
import { AdminUsersComponent } from './components/admin/users/users';

import { UserService } from './services/user.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    App,
    Navbar,
    Home,
    Login,
    Register,
    EventsComponent,
    EventDetailComponent,
    TicketsComponent,
    AdminComponent,
    AdminUsersComponent
  ],
  providers: [UserService],
  // bootstrap: [App]
})
export class AppModule {}