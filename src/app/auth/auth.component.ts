import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  items: any[] | undefined;
  public flag: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.initial(),
      },
      {
        label: 'About',
        icon: 'pi pi-user',
        command: () => this.about(),
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        command: () => this.contact(),
      },
    ];
  }

  contact(): void {
    this.router.navigate(['/contact']);
  }

  initial(): void {
    this.router.navigate(['/home']);
  }

  about(): void {
    this.router.navigate(['/about']);
  }

  changeColor(): void {
    const colors = ['black', 'white'];
    let randomColor = this.flag ? colors[0] : colors[1];

    if (randomColor == 'white') {
      document.body.style.backgroundColor = randomColor;
      document.body.style.color = 'white';
      this.flag = true;
    } else {
      document.body.style.backgroundColor = randomColor;
      document.body.style.color = 'black';
      this.flag = false;
    }
  }
}
