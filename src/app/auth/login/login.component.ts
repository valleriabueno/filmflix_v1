import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
    console.log(this.loginForm.value)
  }

  constructor() { }

  ngOnInit(): void { }

}
