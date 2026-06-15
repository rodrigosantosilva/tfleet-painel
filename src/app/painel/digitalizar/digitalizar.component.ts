import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

import { PainelComponent } from '../painel/painel.component';
import { TesseractService } from '../../services/tesseract.service';
import { itemmanutencao } from '../../types/digitalizar-response.type';

@Component({
  selector: 'app-digitalizar',
  imports: [PainelComponent, CommonModule, MatListModule, ReactiveFormsModule, MatCheckboxModule,
    MatFormFieldModule, FormsModule, MatTableModule, MatInputModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './digitalizar.component.html',
  styleUrl: './digitalizar.component.scss'
})
export class DigitalizarComponent implements OnInit {

  textoExtraido = signal<string>('');
  carregando = signal<boolean>(false);
  imagemPreview = signal<string | null>(null);
  registroSelecionado: any;

  manutencaoForm!: FormGroup;
  form!: FormGroup;
  displayedColumns: string[] = ['id', 'tipo', 'item', 'informacao', 'valor'];
  dataSource = new MatTableDataSource<itemmanutencao>([]);

  tipo: string = '';
  stainfo: boolean = false;
  dataformadada: string | null = '';

  constructor(private tctService: TesseractService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  selecionarRegistro(element: any) {
    this.registroSelecionado = element;
    this.form.get('tipo')?.setValue(this.registroSelecionado.tipo);
    this.form.get('item')?.setValue(this.registroSelecionado.item);
    this.form.get('informacao')?.setValue(this.registroSelecionado.informacao);
    this.form.get('valor')?.setValue(this.registroSelecionado.valor);

  }

  ngOnInit(): void {

    this.form = this.fb.group({
      tipo: ['', Validators.required],
      item: ['', Validators.required],
      informacao: [''],
      valor: ['', Validators.required]
    });

    this.manutencaoForm = this.fb.group({
      ordemexterna: ['', Validators.required],
      placa: ['', Validators.required],
      motivo: ['', Validators.required],
      data: [new Date, Validators.required]
    });

  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const arquivo = input.files[0];

    // Atualiza os estados para a tela do usuário
    this.carregando.set(true);
    this.textoExtraido.set('');
    this.imagemPreview.set(URL.createObjectURL(arquivo));

    try {
      // Chama o método centralizado no serviço
      const resultado = await this.tctService.reconhecerTexto(arquivo);
      this.textoExtraido.set(resultado);
    } catch (erro) {
      this.textoExtraido.set('Falha ao extrair texto da imagem.');
    } finally {
      this.carregando.set(false);
    }
    if (this.stainfo) {
      this.dataSource.data = this.extrairItens3(this.textoExtraido());
    } else {
      this.dataSource.data = this.extrairItens(this.textoExtraido());
    }

  }

  extrairItens(texto: string) {
    const linhas = texto.trim().split("\n");
    const itens: itemmanutencao[] = [];

    for (let i = 0; i < linhas.length - 1; i++) {
      const item = linhas[i].trim();
      const valorLinha = linhas[i + 1];
      const informacao = '';
      const tipo = this.tipo;
      const id = i;
      // Regex para capturar valores monetários
      const match = valorLinha.match(/R\$ ?([\d,.]+)/);
      if (match) {
        itens.push({
          id,
          tipo,
          item,
          informacao,
          valor: match[1]
        });
      }
    }
    return itens; //JSON.stringify(itens, null, 2); 
  }

  formatarData(): string {
    const data = new Date(this.manutencaoForm.value.data);
    return data.toLocaleDateString('pt-BR'); // já retorna dd/MM/yyyy
  }


  async onManutencao() {
    if (this.manutencaoForm.valid) {
      this.dataformadada = this.formatarData();

      for (const item of this.dataSource.data) {
        const result = await this.tctService.gravaManutencao(
          this.manutencaoForm.value.ordemexterna.toUpperCase(),
          this.manutencaoForm.value.placa.toUpperCase(),
          this.manutencaoForm.value.motivo.toUpperCase(),
          this.dataformadada,
          item.tipo.toUpperCase(),
          item.item.toUpperCase(),
          item.informacao.toUpperCase(),
          item.valor
        );
        if (result) {
          this.tctService.mostrarMensagem("Registro inserido com Sucesso.");
          this.toastr.success("Registro inserido com Sucesso.");
        } else {
          this.toastr.error("Falha na inserção");
        }
      }

      this.dataSource.data = [];
      this.manutencaoForm.get('ordemexterna')?.setValue('');
      this.manutencaoForm.get('placa')?.setValue('');
      this.manutencaoForm.get('motivo')?.setValue('');

      this.tctService.mostrarMensagem("Registros inseridos com Sucesso.");
    }
  }



  extrairItens3(texto: string) {
    const linhas = texto.trim().split("\n");
    const itens: itemmanutencao[] = [];
    for (let i = 0; i < linhas.length; i += 3) {
      const item = linhas[i]?.trim() || '';
      const valorLinha = linhas[i + 1] || '';
      const informacao = linhas[i + 2]?.trim() || '';
      const tipo = this.tipo;
      const id = i;
      const match = valorLinha.match(/R\$ ?([\d,.]+)/);

      itens.push({
        id,
        tipo,
        item,
        informacao,
        valor: match ? match[1] : null
      });
    }
    return itens;
  }

  async colarTexto() {
    const texto = await this.tctService.pegarTextoClipboard();
    this.textoExtraido.set(texto);
  }

  onItem() {
    if (this.form.valid) {
      const dados = this.dataSource.data;

      // Cria um novo objeto com os valores do formulário
      const novoRegistro: itemmanutencao = {
        id: 999,
        tipo: this.form.value.tipo,
        item: this.form.value.item,
        informacao: this.form.value.informacao,
        valor: this.form.value.valor
      };
      // Adiciona ao array
      dados.push(novoRegistro);
      // Atualiza o dataSource
      this.dataSource.data = [...dados];

      this.form.reset({
        tipo: '',
        item: '',
        informacao: '',
        valor: ''
      }, { emitEvent: false });

    }
  }

  onAlter() {
    this.registroSelecionado.tipo = this.form.value.tipo;
    this.registroSelecionado.item = this.form.value.item;
    this.registroSelecionado.informacao = this.form.value.informacao;
    this.registroSelecionado.valor = this.form.value.valor;
    const dados = this.dataSource.data.map(item =>
      item === this.registroSelecionado ? this.registroSelecionado : item
    );
    this.dataSource.data = dados;
    this.registroSelecionado = null;
    this.form.reset({
      tipo: '',
      item: '',
      informacao: '',
      valor: ''
    }, { emitEvent: false });
  }

  onDelete() {
    if (!this.registroSelecionado) return alert('Selecione um registro antes de excluir!');
    if (this.registroSelecionado) {
      // Filtra os dados, removendo o registro selecionado
      this.dataSource.data = this.dataSource.data.filter(
        item => item !== this.registroSelecionado
      );
      // Limpa a seleção
      this.registroSelecionado = null;
      this.form.reset({
        tipo: '',
        item: '',
        informacao: '',
        valor: ''
      }, { emitEvent: false });


    }
  }

  formatDate(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (valor.length >= 2) {
      valor = valor.substring(0, 2) + '/' + valor.substring(2);
    }
    if (valor.length >= 5) {
      valor = valor.substring(0, 5) + '/' + valor.substring(5, 9);
    }
    input.value = valor;
    if (valor.length == 10) {
      let partes = valor.split('/');
      const dateObject = new Date(Number(partes[2]), Number(partes[1]) - 1, Number(partes[0]));
      this.manutencaoForm.get(field)?.setValue(dateObject);
    }
  }

}
