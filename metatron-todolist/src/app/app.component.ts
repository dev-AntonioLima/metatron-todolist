import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: string = 'list';
  public todos: Todo[] = [];
  public title: String = 'Lista de Tarefas:';
  public form: FormGroup;


  //FormGroup do Angular composto pelo FormBuilder

  //Essa linha cria a instância do FormBuilder
  constructor(private fb: FormBuilder) {
    //this.form = this.fb.group()  == cria um grupo no FormBuilder

    this.form = this.fb.group({

      //title é um item do FormGroup, poderiamos ter outros itens como id, boolean ou qualquer outro. Mas nesse momento é só o title.

      //Validators são validações.

      //Validators fica dentro de um array. Se você for usar apenas 1 item você pode usar apenas o Validators.required, se for usar 2 itens ou mais usar em conjunto o Validators.compose
      
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

    //Chamado o método load no construtor, pois o construtor é executado toda vez que a aplicação inícia.
    //O método load faz com que os itens salvos no Localstorage sejam mostrados na tela.
    this.load();

  }

  add(){
    //this.form.value = Atribui mensagem ao Título
    const title = this.form.controls['title'].value;

    //this.todos.length + 1 = Atribui um número ao id que será informado
    const id = this.todos.length + 1;

    //chamando o mensagem que foi digitada com os atributos id, 
    //texto da mensagem e inicializando-a como a ser feita.
    this.todos.push(new Todo(id, title, false));

    //Persistindo os dados no LocalStorage
    this.save();

    //limpando a barra onde o texto é digitado.
    this.clear();
  }


  //Ação de limpar
  clear(){
    this.form.reset();
  }

  //Ação de remover item da tela
  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if (index !== -1){
      this.todos.splice(index, 1);
    }
    this.save();
  }

  //Ação de marcar como feito/concluído
  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  //Ação de marcar como NÃO feito/concluído
  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  //Ação de salvar um item cadastrado no LocalStorage
  save(){
    //JSON.stringify = Converte um JSON em uma string
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode='list';
  }

  //Ação de carregar na tela o item salvo no LocalStorage
  load(){
    const data = localStorage.getItem('todos');

    //validando se os dados não vieram nulos do LocalStorage
    if (data){
    //JSON.parse = Converte uma string em um JSON  
    this.todos = JSON.parse(data)
    } else {
    this.todos = [];
   }
  }

  changeMode(mode: string){
    this.mode = mode;
  }




}
