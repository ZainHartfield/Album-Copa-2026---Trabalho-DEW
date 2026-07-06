import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Figurinha {
  id: number;
  nome: string;
  raridade: 'comum' | 'rara' | 'iconica' | 'lendaria';
  imagem: string;
  bandeira: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  figurinhas: Figurinha[] = [
    { id: 1, nome: 'Vinicius Jr', raridade: 'comum', imagem: 'Vinicius Jr.png', bandeira: '🇧🇷' },
    { id: 2, nome: 'Raphinha', raridade: 'comum', imagem: 'Raphinha.png', bandeira: '🇧🇷' },
    { id: 3, nome: 'Fred', raridade: 'comum', imagem: 'Fred.png', bandeira: '🇧🇷' },
    { id: 4, nome: 'Gabriel Jesus', raridade: 'comum', imagem: 'Gabriel Jesus.png', bandeira: '🇧🇷' },
    { id: 5, nome: 'Lucas Paquetá', raridade: 'comum', imagem: 'Lucas Paquetá.png', bandeira: '🇧🇷' },
    { id: 6, nome: 'Casemiro', raridade: 'rara', imagem: 'Casemiro.png', bandeira: '🇧🇷' },
    { id: 7, nome: 'Thiago Silva', raridade: 'rara', imagem: 'Thiago Silva.png', bandeira: '🇧🇷' },
    { id: 8, nome: 'Dida', raridade: 'rara', imagem: 'Dida.png', bandeira: '🇧🇷' },
    { id: 9, nome: 'Neymar Jr', raridade: 'iconica', imagem: 'Neymar Jr.png', bandeira: '🇧🇷' },
    { id: 10, nome: 'Pelé', raridade: 'iconica', imagem: 'Pelé.png', bandeira: '🇧🇷' },
    { id: 11, nome: 'Kaká', raridade: 'rara', imagem: 'Kaká.png', bandeira: '🇧🇷' },
    { id: 12, nome: 'Ronaldo Fênomeno', raridade: 'lendaria', imagem: 'Ronaldo Fênomeno.png', bandeira: '🇧🇷' },
    { id: 13, nome: 'Cafu', raridade: 'lendaria', imagem: 'Cafu.png', bandeira: '🇧🇷' },
    { id: 14, nome: 'Romário', raridade: 'lendaria', imagem: 'Romário.png', bandeira: '🇧🇷' }
  ];

  figurinhasFiltradas: Figurinha[] = [];
  filtroAtivo: string = 'todas';
  modalVisivel: boolean = false;
  
  figurinhaSelecionada: Figurinha = {
    id: 0, nome: '', raridade: 'comum', imagem: '', bandeira: ''
  };

  ngOnInit() {
    this.figurinhasFiltradas = [...this.figurinhas];
  }

  filtrarFigurinhas(raridade: string) {
    this.filtroAtivo = raridade;
    if (raridade === 'todas') {
      this.figurinhasFiltradas = [...this.figurinhas];
    } else {
      this.figurinhasFiltradas = this.figurinhas.filter(f => f.raridade === raridade);
    }
  }

  abrirModal(figurinha: Figurinha) {
    // 1. Primeiro, resetamos a imagem selecionada para ficar vazia
    this.figurinhaSelecionada.imagem = '';
    
    // 2. Agora sim, passamos os dados da nova figurinha
    this.figurinhaSelecionada = { ...figurinha };
    this.figurinhaSelecionada.imagem = encodeURI(figurinha.imagem);
    
    this.modalVisivel = true;
    document.body.style.overflow = 'hidden';
  }

  fecharModal() {
    this.modalVisivel = false;
    document.body.style.overflow = 'auto';
    
    // 3. Força a limpeza do objeto ao fechar, garantindo que o próximo clique comece do zero
    setTimeout(() => {
      this.figurinhaSelecionada = { id: 0, nome: '', raridade: 'comum', imagem: '', bandeira: '' };
    }, 200); // 200ms é o tempo padrão da animação de fechar do CSS
  }

  get totalTodas() { return this.figurinhas.length; }
  get totalComum() { return this.figurinhas.filter(f => f.raridade === 'comum').length; }
  get totalRara() { return this.figurinhas.filter(f => f.raridade === 'rara').length; }
  get totalIconica() { return this.figurinhas.filter(f => f.raridade === 'iconica').length; }
  get totalLendaria() { return this.figurinhas.filter(f => f.raridade === 'lendaria').length; }
}