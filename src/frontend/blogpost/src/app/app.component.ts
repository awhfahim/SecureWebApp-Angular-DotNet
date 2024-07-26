import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {initFlowbite} from "flowbite";
import {NavbarComponent} from "./public/navbar/navbar.component";
import {MessageComponent} from "./shared/message/message.component";
import {AccountService} from "./core/auth/services/account.service";
import { LoadingComponent } from "./shared/loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, MessageComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'adafd';
}
