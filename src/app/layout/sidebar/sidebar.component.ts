import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() expandirMenu = new EventEmitter<void>();


  ativarBusca = false;
  valorBusca = '';
  menuSelecionado = 'Dashboard';

  menus = [
    { nome: 'Dashboard' },
    { nome: 'Usuários'},
    { nome: 'Ensaios'},
    { nome: 'Repertório' },
    { nome: 'Shows'},
    { nome: 'Financeiro'}
  ];

  selecionarMenu(nome: string) {
    this.menuSelecionado = nome;
    this.fecharBuscaManual();
  }

  @ViewChild('inputBusca') inputBusca!: ElementRef;

  constructor(private eRef: ElementRef) {}

  emitToggle() {
    this.sidebarToggle.emit();
  }

  abrirBusca() {
    if (this.isSidebarCollapsed) {
      this.expandirMenu.emit(); // Expande o menu
      // espera um pouco para o menu expandir e o input aparecer
      setTimeout(() => {
        this.ativarBusca = true;
        setTimeout(() => this.inputBusca?.nativeElement.focus(), 10);
      }, 50);
    } else {
      this.ativarBusca = true;
      // foca direto se já está expandido
      setTimeout(() => this.inputBusca?.nativeElement.focus(), 10);
    }
  }

  fecharBuscaManual() {
    this.ativarBusca = false;
    this.valorBusca = '';
  
    if (this.inputBusca) {
      this.inputBusca.nativeElement.blur();
    }
  }

  @HostListener('document:click', ['$event'])
onClickOutside(event: MouseEvent) {
  const clicouDentro = this.eRef.nativeElement.contains(event.target);
  if (!clicouDentro) {
    this.ativarBusca = false;
    this.valorBusca = ''; // limpa o texto
  }
}

ngAfterViewInit(): void {

  }

}
