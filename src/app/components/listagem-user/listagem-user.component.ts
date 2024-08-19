import { CommonModule } from '@angular/common';
import {ChangeDetectorRef, Component, Input, OnChanges, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { User } from '../../models/user';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listagem-user',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule],
  
  templateUrl: './listagem-user.component.html',
  styleUrl: './listagem-user.component.css'
})
export class ListagemUserComponent implements OnChanges{

  @Input() dataSource: User[] = [];
  @Output() editar = new EventEmitter<User>();
  @Output() excluir = new EventEmitter<number>();


  displayedColumns: string[] = ['nome', 'cpf', 'data_nasc', 'sex', 'acoes'];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      console.log('Informação atualizada:', this.dataSource);
      this.cdr.detectChanges(); 
      this.dataSource = [...this.dataSource];
      // Executar lógica de atualização aqui
    }
  }

  formatarCpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  editarItem(item: User){
    this.editar.emit(item);
  }

  excluirItem(item:User){
    this.excluir.emit(item.id);
  }

}
