/*
============================================
ARQUIVO JAVASCRIPT - COM FUNCIONALIDADE DE MODAL
============================================

Este arquivo contém:
1. Filtros de figurinhas
2. Contagem de estatísticas
3. Navegação por teclado (acessibilidade)
4. NOVO: Funcionalidade de modal/popup com zoom
5. NOVO: Fechar modal de múltiplas formas

============================================
*/

/*
============================================
PASSO 1: ESPERAR O HTML CARREGAR
============================================

DOMContentLoaded garante que o HTML foi totalmente carregado
antes de executar nosso código JavaScript.
*/

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ JavaScript carregado com sucesso!');

    /*
    ============================================
    PASSO 2: SELECIONAR ELEMENTOS DO HTML
    ============================================
    */

    // Elementos do modal
    const modal = document.getElementById('modal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalFechar = document.getElementById('modalFechar');
    const modalImagem = document.getElementById('modalImagem');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalRaridade = document.getElementById('modalRaridade');

    // Elementos de filtro
    const botoesFiltro = document.querySelectorAll('.btn-filtro');

    // Elementos de figurinha
    const figurinhas = document.querySelectorAll('.figurinha');

    // Elementos de estatísticas
    const totalFigurinhas = document.getElementById('total-figurinhas');
    const totalComum = document.getElementById('total-comum');
    const totalRara = document.getElementById('total-rara');
    const totalLendaria = document.getElementById('total-lendaria');
    const totalIconica = document.getElementById('total-iconica');

    console.log('✅ Elementos selecionados:', {
        modal: modal ? '✓' : '✗',
        figurinhas: figurinhas.length,
        botoesFiltro: botoesFiltro.length
    });

    /*
    ============================================
    PASSO 3: FUNÇÕES DO MODAL
    ============================================

    Essas funções controlam a abertura e fechamento do modal.
    */

    /**
     * Função para ABRIR o modal
     * 
     * Recebe:
     * - nome: Nome do jogador (ex: "Neymar Jr")
     * - raridade: Raridade da figurinha (ex: "Comum")
     * - imagem: URL da imagem (ex: "neymar.jpg")
     * 
     * O que faz:
     * 1. Coloca as informações nos elementos do modal
     * 2. Adiciona a classe "ativo" ao modal e backdrop
     * 3. CSS muda display: none para display: block
     */
    function abrirModal(nome, raridade, imagem) {
        console.log('🖼️ Abrindo modal:', { nome, raridade, imagem });

        // Coloca o título
        modalTitulo.textContent = nome;

        // Coloca a raridade
        modalRaridade.textContent = raridade;

        // Coloca a imagem
        modalImagem.src = imagem;
        modalImagem.alt = `${nome} - Figurinha ${raridade}`;

        // Adiciona a classe "ativo" para mostrar o modal
        modal.classList.add('ativo');
        modalBackdrop.classList.add('ativo');

        // Impede scroll da página enquanto o modal está aberto
        document.body.style.overflow = 'hidden';
    }

    /**
     * Função para FECHAR o modal
     * 
     * O que faz:
     * 1. Remove a classe "ativo" do modal e backdrop
     * 2. CSS muda display: block para display: none
     * 3. Permite scroll da página novamente
     */
    function fecharModal() {
        console.log('❌ Fechando modal');

        // Remove a classe "ativo" para ocultar o modal
        modal.classList.remove('ativo');
        modalBackdrop.classList.remove('ativo');

        // Permite scroll da página novamente
        document.body.style.overflow = 'auto';
    }

    /*
    ============================================
    PASSO 4: EVENTOS DO MODAL
    ============================================

    Adicionamos listeners para diferentes formas de fechar o modal.
    */

    // ❌ Clique no botão X (fechar)
    modalFechar.addEventListener('click', function(evento) {
        // Previne que o clique se propague para o backdrop
        evento.stopPropagation();
        fecharModal();
    });

    // ❌ Clique fora do modal (no backdrop)
    modalBackdrop.addEventListener('click', function() {
        fecharModal();
    });

    // ❌ Pressionar ESC (bônus de acessibilidade)
    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'Escape') {
            fecharModal();
        }
    });

    /*
    ============================================
    PASSO 5: FUNÇÃO PARA CONTAR FIGURINHAS
    ============================================

    Esta função conta quantas figurinhas de cada raridade existem.
    */

    function atualizarEstatisticas() {
        // Conta figurinhas de cada tipo
        const contagem = {
            todas: 0,
            comum: 0,
            rara: 0,
            lendaria: 0,
            iconica: 0
        };

        // Percorre todas as figurinhas
        figurinhas.forEach(figurinha => {
            // Verifica se a figurinha está visível (não tem classe "oculta")
            if (!figurinha.classList.contains('oculta')) {
                // Pega o atributo data-raridade
                const raridade = figurinha.getAttribute('data-raridade');

                // Incrementa o contador total
                contagem.todas++;

                // Incrementa o contador da raridade
                if (raridade === 'comum') {
                    contagem.comum++;
                } else if (raridade === 'rara') {
                    contagem.rara++;
                } else if (raridade === 'lendaria') {
                    contagem.lendaria++;
                } else if (raridade === 'iconica') {
                    contagem.iconica++; 
                }
            }
        });

        // Atualiza o HTML com os números
        totalFigurinhas.textContent = contagem.todas;
        totalComum.textContent = contagem.comum;
        totalRara.textContent = contagem.rara;
        totalLendaria.textContent = contagem.lendaria;
        totalIconica.textContent = contagem.iconica;
        console.log('📊 Estatísticas atualizadas:', contagem);
    }

    /*
    ============================================
    PASSO 6: FUNÇÃO PARA FILTRAR FIGURINHAS
    ============================================

    Esta função mostra/oculta figurinhas baseado no filtro selecionado.
    */

    function filtrarFigurinhas(filtroSelecionado) {
        console.log('🔍 Filtrando por:', filtroSelecionado);

        // Percorre todas as figurinhas
        figurinhas.forEach(figurinha => {
            // Pega a raridade da figurinha
            const raridade = figurinha.getAttribute('data-raridade');

            // Se o filtro é "todas", mostra todas as figurinhas
            if (filtroSelecionado === 'todas') {
                figurinha.classList.remove('oculta');
            }
            // Se a raridade corresponde ao filtro, mostra
            else if (raridade === filtroSelecionado) {
                figurinha.classList.remove('oculta');
            }
            // Caso contrário, oculta
            else {
                figurinha.classList.add('oculta');
            }
        });

        // Atualiza as estatísticas após filtrar
        atualizarEstatisticas();
    }

    /*
    ============================================
    PASSO 7: EVENTOS DOS BOTÕES DE FILTRO
    ============================================

    Adiciona listeners aos botões de filtro.
    */

    botoesFiltro.forEach(botao => {
        // Quando o usuário clica no botão
        botao.addEventListener('click', function() {
            // Pega o valor do atributo data-filtro
            const filtro = this.getAttribute('data-filtro');

            console.log('🖱️ Botão clicado:', filtro);

            // Remove a classe "ativo" de todos os botões
            botoesFiltro.forEach(b => b.classList.remove('ativo'));

            // Adiciona a classe "ativo" ao botão clicado
            this.classList.add('ativo');

            // Filtra as figurinhas
            filtrarFigurinhas(filtro);
        });

        // Acessibilidade: Navegação por teclado
        botao.addEventListener('keydown', function(evento) {
            if (evento.key === 'Enter') {
                this.click();
            }
        });
    });

    /*
    ============================================
    PASSO 8: EVENTOS DAS FIGURINHAS
    ============================================

    Adiciona listeners às figurinhas para abrir o modal.
    */

    figurinhas.forEach(figurinha => {
        // Adiciona atributo tabindex para permitir navegação por teclado
        figurinha.setAttribute('tabindex', '0');

        // 🖱️ Clique em uma figurinha
        figurinha.addEventListener('click', function() {
            // Pega as informações da figurinha
            const nome = this.querySelector('h3').textContent;
            const raridade = this.querySelector('.raridade').textContent;
            const imagem = this.getAttribute('data-imagem');

            console.log('👆 Figurinha clicada:', { nome, raridade, imagem });

            // Abre o modal com as informações
            abrirModal(nome, raridade, imagem);
        });

        // ⌨️ Pressionar Enter em uma figurinha (acessibilidade)
        figurinha.addEventListener('keydown', function(evento) {
            if (evento.key === 'Enter') {
                // Simula um clique
                this.click();
            }
        });

        // 🎨 Efeito visual ao passar o mouse
        figurinha.addEventListener('mouseenter', function() {
            console.log('🎨 Mouse sobre figurinha');
        });
    });

    /*
    ============================================
    PASSO 9: SMOOTH SCROLL (SCROLL SUAVE)
    ============================================

    Faz o scroll ser suave ao clicar em links.
    */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(evento) {
            evento.preventDefault();

            const alvo = document.querySelector(this.getAttribute('href'));

            if (alvo) {
                alvo.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /*
    ============================================
    PASSO 10: INICIALIZAR O SITE
    ============================================

    Executa funções iniciais quando a página carrega.
    */

    // Atualiza as estatísticas na primeira vez
    atualizarEstatisticas();

    // Mostra uma mensagem no console
    console.log('🎉 Site inicializado com sucesso!');
    console.log('💡 Dica: Abra o DevTools (F12) para ver os logs do JavaScript');

    /*
    ============================================
    PASSO 11: FUNÇÃO PARA DEPURAÇÃO
    ============================================

    Função útil para entender o que está acontecendo.
    */

    window.debugarFigurinhas = function() {
        console.log('🔍 Figurinhas no site:');
        figurinhas.forEach((fig, index) => {
            const nome = fig.querySelector('h3').textContent;
            const raridade = fig.getAttribute('data-raridade');
            const visivel = !fig.classList.contains('oculta');
            console.log(`${index + 1}. ${nome} (${raridade}) - ${visivel ? '✅ Visível' : '❌ Oculta'}`);
        });
    };

    console.log('💡 Dica: Digite debugarFigurinhas() no console para ver todas as figurinhas');

    /*
    ============================================
    PASSO 12: FUNÇÃO PARA DEPURAÇÃO DO MODAL
    ============================================

    Função útil para testar o modal.
    */

    window.testarModal = function(nome = 'Teste', raridade = 'Rara', imagem = 'https://via.placeholder.com/400x500?text=Teste') {
        console.log('🧪 Testando modal com:', { nome, raridade, imagem });
        abrirModal(nome, raridade, imagem);
    };

    console.log('💡 Dica: Digite testarModal() no console para testar o modal');
});

/*
============================================
RESUMO DO QUE ESTE JAVASCRIPT FAZ
============================================

✅ MODAL/POPUP:
   - Clique em uma figurinha abre o modal
   - Modal mostra a imagem em zoom
   - Clique no X fecha o modal
   - Clique fora do modal fecha
   - Pressionar ESC fecha o modal

✅ FILTROS FUNCIONAIS:
   - Clique em um botão de filtro
   - Mostra/oculta figurinhas baseado no filtro
   - Atualiza as estatísticas

✅ ACESSIBILIDADE:
   - Navegação por teclado (Tab, Enter)
   - Atributo tabindex permite focar em elementos
   - Eventos de teclado funcionam como cliques
   - ESC fecha o modal

✅ ESTATÍSTICAS:
   - Conta figurinhas de cada raridade
   - Atualiza o HTML com os números
   - Funciona automaticamente

✅ INTERATIVIDADE:
   - Eventos de mouse (hover, click)
   - Eventos de teclado (Enter, Tab, ESC)
   - Console.log para depuração

✅ BOAS PRÁTICAS:
   - DOMContentLoaded garante que HTML carregou
   - querySelectorAll para encontrar múltiplos elementos
   - forEach para iterar sobre elementos
   - addEventListener para adicionar eventos
   - Comentários explicando cada parte

============================================
*/

/*
============================================
DICAS PARA ENTENDER MELHOR
============================================

1. ABRA O DEVTOOLS:
   - Pressione F12 no navegador
   - Vá para a aba "Console"
   - Veja os logs do JavaScript

2. TESTE O MODAL:
   - Clique em uma figurinha
   - Veja o modal abrir
   - Clique no X ou fora para fechar
   - Pressione ESC para fechar

3. TESTE OS FILTROS:
   - Clique nos botões de filtro
   - Veja as figurinhas aparecerem/desaparecerem
   - Veja as estatísticas atualizarem

4. TESTE ACESSIBILIDADE:
   - Pressione Tab para navegar
   - Pressione Enter para ativar botões
   - Pressione ESC para fechar modal
   - Veja os eventos no console

5. DEPURE:
   - Digite debugarFigurinhas() no console
   - Digite testarModal() no console
   - Veja todas as figurinhas e seus estados

============================================
*/