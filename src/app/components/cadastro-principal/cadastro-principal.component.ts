import { Component } from '@angular/core';
import { User } from '../../models/user';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, ValidatorFn, ValidationErrors} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ListagemUserComponent } from '../listagem-user/listagem-user.component';


@Component({
  selector: 'app-cadastro-principal',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatRadioModule,  NgxMaskDirective,
    ListagemUserComponent
  ],
  providers: [provideNativeDateAdapter(), provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' } 
  ],
  templateUrl: './cadastro-principal.component.html',
  styleUrl: './cadastro-principal.component.css'
})
export class CadastroPrincipalComponent {
  formUser: FormGroup;
   usuarios: User[] = []
  nomeBotao: string = "salvar";
  editando: boolean = false;


   constructor(){

    this.formUser  = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cpf: new FormControl('', [Validators.required]),
      data_nasc: new FormControl<Date | null>(null, [Validators.required]),
      sex: new FormControl('', [Validators.required]),

    })
   }

   SaveUser(){

    if(this.editando){

        let indexUser = this.usuarios.findIndex(user => user.cpf === this.formUser.controls['cpf'].value);

        this.usuarios[indexUser].nome = this.formUser.controls['nome'].value
        this.usuarios[indexUser].data_nasc = this.formUser.controls['data_nasc'].value
        this.usuarios[indexUser].sex = this.formUser.controls['sex'].value
       
      this.resetarCadastro()
    }
    else{

      if(this.validaCPF(this.formUser.value.cpf)){

        if(this.usuarios.length === 0){
          const data = {
            id: 0,
            nome: this.formUser.value.nome,
            cpf: this.formUser.value.cpf,
            data_nasc: this.formUser.value.data_nasc,
            sex: this.formUser.value.sex
          }
  
          this.usuarios.push(data);
          this.resetarCadastro()
        }
        else{
          let varificaIgualdade = this.usuarios.find(user => user.cpf === this.formUser.value.cpf)

          if(!varificaIgualdade){
            const data = {
              id: this.usuarios[this.usuarios.length - 1].id + 1,
              nome: this.formUser.value.nome,
              cpf: this.formUser.value.cpf,
              data_nasc: this.formUser.value.data_nasc,
              sex: this.formUser.value.sex
            }
    
            this.usuarios.push(data);
            this.resetarCadastro()
          }
          else{
            alert("CPF EXISTENTE")
          }
        }
       
      }
      else{
        alert("CPF INVÁLIDO")
      }
     
    }
   

    

    console.log(this.usuarios)
    this.usuarios = [...this.usuarios];

   }

   editarItem(item: User){
    this.editando = true;
    this.nomeBotao = "editar"

    console.log(item)
    this.formUser.controls['nome'].setValue(item.nome)
    this.formUser.controls['cpf'].setValue(item.cpf)
    this.formUser.controls['cpf'].disable();
    this.formUser.controls['data_nasc'].setValue(item.data_nasc)
    this.formUser.controls['sex'].setValue(item.sex)


    
   }

   excluirItem(id: number){

    let indexUser = this.usuarios.findIndex(user => user.id === id);

    this.usuarios.splice(indexUser, 1)

   }

   validaCPF(cpf: string): boolean{

    let soma1 = this.auxValidaCpf(cpf.slice(0,9), 1);
    let dezena = (soma1 % 11) == 10 ? 0 : soma1 % 11;
    let soma2 = this.auxValidaCpf(cpf.slice(0,9), 0) + (dezena * 9);
    let unidade = (soma2 % 11) == 10 ? 0 : soma2 % 11;

    if(dezena === parseInt(cpf.slice(9, 10)) && unidade === parseInt(cpf.slice(10))){
      return true
    }
    else{
      return false
    }
   }

   private auxValidaCpf(cpf: string, somaAdd: number): number{

    let soma = 0;

    for(let i = 0; i < cpf.length; i++){
      soma = soma + parseInt(cpf.slice(i, i + 1)) * (i + somaAdd);
    }
    return soma;
   }

   resetarCadastro(){
    this.formUser.controls['nome'].setValue('')
    this.formUser.controls['cpf'].setValue('')
    this.formUser.controls['cpf'].enable();
    this.formUser.controls['data_nasc'].setValue('')
    this.formUser.controls['sex'].setValue('')

    this.editando = false
    this.nomeBotao = "salvar"
   }

}
