// Dados do colégio
const dadosColegio = {
  telefone: '921660962',
  email: 'fernandomateusdomingos08@gmail.com',
  whatsapp: '921660962',
}

// Sistema do modo escuro
const botaoModoEscuro = document.getElementById('botao-modo-escuro')
const body = document.body

// Verificar modo escuro salvo
if (localStorage.getItem('modoEscuro') === 'ativo') {
  body.classList.add('modo-escuro')
}

botaoModoEscuro.addEventListener('click', () => {
  body.classList.toggle('modo-escuro')

  if (body.classList.contains('modo-escuro')) {
    localStorage.setItem('modoEscuro', 'ativo')
  } else {
    localStorage.setItem('modoEscuro', 'inativo')
  }
})

// Configurar botões de contacto
document.getElementById('botao-ligar').addEventListener('click', function () {
  window.location.href = `tel:+244${dadosColegio.telefone}`
})

document.getElementById('botao-matricular').addEventListener('click', function () {
  alert('Funcionalidade: Matricular-se\nSerá redirecionado para o formulário de matrícula online.')
})

document.getElementById('botao-email').addEventListener('click', function () {
  window.location.href = `mailto:${dadosColegio.email}?subject=Contacto do Colégio Mundo Novo I & II&body=Olá, gostaria de obter mais informações sobre o colégio.`
})

document.getElementById('botao-whatsapp').addEventListener('click', function () {
  const mensagem = encodeURIComponent(
    'Olá, gostaria de obter mais informações sobre o Colégio Mundo Novo I & II.'
  )
  window.open(`https://wa.me/244${dadosColegio.whatsapp}?text=${mensagem}`, '_blank')
})

// Botão Ver Mais no menu
document.querySelector('.botao-ver-mais').addEventListener('click', function (e) {
  e.preventDefault()
  window.location.href = '#cursos'
  // Fechar menu após clique
  document.querySelector('.submenu').style.opacity = '0'
  document.querySelector('.submenu').style.visibility = 'hidden'
  document.querySelector('.submenu').style.maxHeight = '0'
})

// Sistema do slider
let slideAtual = 0
let intervaloSlider

function inicializarSlider() {
  const slides = document.querySelectorAll('.slide')
  const indicadores = document.querySelectorAll('.indicador')

  function mostrarSlide(indice) {
    slides.forEach((slide) => {
      slide.classList.remove('ativo')
    })

    indicadores.forEach((indicador) => {
      indicador.classList.remove('ativo')
    })

    slideAtual = indice

    slides[indice].classList.add('ativo')
    indicadores[indice].classList.add('ativo')
  }

  function proximoSlide() {
    let novoIndice = slideAtual + 1
    if (novoIndice >= slides.length) {
      novoIndice = 0
    }
    mostrarSlide(novoIndice)
  }

  // Configurar eventos dos indicadores
  indicadores.forEach((indicador) => {
    indicador.addEventListener('click', () => {
      const indice = parseInt(indicador.getAttribute('data-indice'))
      mostrarSlide(indice)
      reiniciarIntervalo()
    })
  })

  function reiniciarIntervalo() {
    clearInterval(intervaloSlider)
    iniciarSlider()
  }

  function iniciarSlider() {
    intervaloSlider = setInterval(proximoSlide, 5000)
  }

  // Inicializar
  mostrarSlide(0)
  iniciarSlider()

  // Configurar eventos dos botões do slider
  document.querySelectorAll('.botao-slide-primario, .botao-slide-secundario').forEach((botao) => {
    botao.addEventListener('click', function () {
      const textoBotao = this.textContent.trim()
      alert(
        `Funcionalidade: ${textoBotao}\nEsta acção seria implementada na versão completa do site.`
      )
    })
  })
}

// Configurar navegação do menu
function configurarNavegacao() {
  document.querySelectorAll('.menu a').forEach((link) => {
    link.addEventListener('click', function (e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault()

        const targetId = this.getAttribute('href')
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          document.querySelectorAll('.menu a').forEach((l) => {
            l.classList.remove('ativo')
          })

          this.classList.add('ativo')

          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth',
          })
        }
      }
    })
  })

  // Detectar scroll para destacar menu ativo
  window.addEventListener('scroll', function () {
    const scrollPos = window.scrollY + 100

    document.querySelectorAll('section[id]').forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      const sectionId = section.getAttribute('id')

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.menu a').forEach((link) => {
          link.classList.remove('ativo')
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('ativo')
          }
        })
      }
    })
  })
}

// Efeito de digitação no slogan
function iniciarEfeitoDigitacao() {
  const slogan = document.querySelector('.slogan')
  if (slogan) {
    const textoOriginal = slogan.textContent
    slogan.textContent = ''

    let i = 0
    function digitar() {
      if (i < textoOriginal.length) {
        slogan.textContent += textoOriginal.charAt(i)
        i++
        setTimeout(digitar, 50)
      }
    }

    setTimeout(digitar, 1000)
  }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
  configurarNavegacao()
  inicializarSlider()
  iniciarEfeitoDigitacao()
})


// ---------------
// Configurar botão Agendar Visita
document.getElementById('botao-agendar').addEventListener('click', function() {
    const telefone = "921660962";
    const mensagem = encodeURIComponent('Olá, gostaria de agendar uma visita ao Colégio Mundo Novo I & II. Poderia me informar os horários disponíveis?');
    window.open(`https://wa.me/244${telefone}?text=${mensagem}`, '_blank');
});

// --------

// Sistema de filtro para atividades extracurriculares
function configurarFiltroAtividades() {
    const botoesFiltro = document.querySelectorAll('.botao-filtro');
    const categorias = document.querySelectorAll('.categoria-atividade');
    
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('ativo');
            
            // Obter a categoria selecionada
            const categoriaSelecionada = this.getAttribute('data-categoria');
            
            // Esconder todas as categorias
            categorias.forEach(categoria => {
                categoria.classList.remove('ativa');
            });
            
            // Mostrar apenas a categoria selecionada
            const categoriaAlvo = document.getElementById(categoriaSelecionada);
            if (categoriaAlvo) {
                categoriaAlvo.classList.add('ativa');
            }
        });
    });
}

// Inicializar o sistema de filtro quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    configurarFiltroAtividades();
});

// ---------------
// Efeito de scroll para aparecer o footer
function animarFooterAoRolar() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add('animado');
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(footer);
}

// Adicionar ano atual dinamicamente no copyright
function atualizarAnoCopyright() {
    const anoAtual = new Date().getFullYear();
    const elementosCopyright = document.querySelectorAll('.copyright p');
    
    elementosCopyright.forEach(elemento => {
        elemento.innerHTML = elemento.innerHTML.replace('2025', anoAtual);
    });
}

// Configurar eventos de clique nos links do footer
function configurarLinksFooter() {
    // Links para política de privacidade
    document.querySelectorAll('a[href="#privacidade"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Política de Privacidade:\n\nRespeitamos sua privacidade. Todos os dados dos nossos alunos são tratados com confidencialidade e segurança, em conformidade com a legislação angolana de proteção de dados.');
        });
    });
    
    // Links para termos e condições
    document.querySelectorAll('a[href="#termos"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Termos e Condições:\n\nPara mais informações sobre nossos termos e condições, entre em contacto através do email: fernandomateusdomingos08@gmail.com');
        });
    });
    
    // Links para redes sociais
    document.querySelectorAll('.rede-social').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const plataforma = this.getAttribute('title');
            alert(`Redirecionando para nossa página no ${plataforma}...\n\nEsta funcionalidade será implementada na versão completa do site.`);
        });
    });
}

// Inicializar funções do footer
document.addEventListener('DOMContentLoaded', function() {
    atualizarAnoCopyright();
    configurarLinksFooter();
    
    // Adicionar pequeno atraso para animação do footer
    setTimeout(animarFooterAoRolar, 500);
});

// ----------------------
// Sistema de Perguntas Frequentes (2 colunas)
function inicializarPerguntasFrequentes() {
    const perguntasItems = document.querySelectorAll('.pergunta-item');
    
    perguntasItems.forEach(item => {
        const cabecalho = item.querySelector('.pergunta-cabecalho');
        const icone = item.querySelector('.icone-pergunta i');
        
        cabecalho.addEventListener('click', () => {
            // Verifica se a pergunta já está ativa
            const estaAtiva = item.classList.contains('ativo');
            
            // Fecha todas as outras perguntas
            if (!estaAtiva) {
                perguntasItems.forEach(outroItem => {
                    if (outroItem !== item && outroItem.classList.contains('ativo')) {
                        outroItem.classList.remove('ativo');
                        const outroIcone = outroItem.querySelector('.icone-pergunta i');
                        outroIcone.className = 'fas fa-plus';
                    }
                });
            }
            
            // Alterna a pergunta clicada
            item.classList.toggle('ativo');
            
            // Muda o ícone
            if (item.classList.contains('ativo')) {
                icone.className = 'fas fa-times';
            } else {
                icone.className = 'fas fa-plus';
            }
        });
    });
}

// Botões de contacto na secção de perguntas
document.getElementById('botao-whatsapp-perguntas').addEventListener('click', function() {
    const telefone = "921660962";
    const mensagem = encodeURIComponent('Olá, gostaria de tirar algumas dúvidas sobre o Colégio Mundo Novo I & II.');
    window.open(`https://wa.me/244${telefone}?text=${mensagem}`, '_blank');
});

document.getElementById('botao-email-perguntas').addEventListener('click', function() {
    const email = "fernandomateusdomingos08@gmail.com";
    const assunto = encodeURIComponent("Dúvidas sobre o Colégio Mundo Novo I & II");
    const mensagem = encodeURIComponent("Olá, gostaria de esclarecer algumas dúvidas sobre o colégio:");
    
    window.location.href = `mailto:${email}?subject=${assunto}&body=${mensagem}`;
});

// Adicionar a inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // ...outro código que já existe...
    
    // Inicializar Perguntas Frequentes
    inicializarPerguntasFrequentes();
});



//---------
