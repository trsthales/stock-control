import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { UserService } from 'src/app/services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly cookieService: CookieService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
            this.messageService.add({severity:'success', summary:'Login realizado com sucesso', detail:'Bem vindo!'});
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary:'Erro ao realizar login', detail:'Verifique suas credenciais'});
        },
      });
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as SignupUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.signupForm.reset();
              this.loginCard = true;
              this.messageService.add({severity:'success', summary:'Usuario criado com sucesso', detail:'Bem vindo!'});
            }
          },
          error: (error) => {
            this.messageService.add({severity:'error', summary:'Erro ao criar usuario', detail:'Tente novamente mais tarde'});
          },
        });
    }
  }
}
