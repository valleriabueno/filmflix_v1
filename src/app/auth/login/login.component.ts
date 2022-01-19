import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from './../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // referência de template #login (html)
  @ViewChild('login') loginForm!: NgForm;

  //Método chamado na execução do formulário #login
  onSubmit(){
    //alert('Ok!');
    // Vai retornar o objeto contendo o email e senha. Todo o processo será completado com o Login.service.
    // console.log(this.loginForm.value)
    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    this.authService.login(email, password).subscribe({
      next: (creds) => {},
      error: (err) => {
        //para visulizar o erro previamente
        //console.log(err.code);
        //alert(err.code);
        let message = "";

        switch(err.code){
          case "auth/invalid-email":
            message = 'Emailinválido!';
            break;
          case 'auth/user-not-found':
            message = 'Usuário não encontrado';
            break;
        }

        this.snackbar.open(message, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end',
        });
      }
    });
  }

  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit(): void { }

}
