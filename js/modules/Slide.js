export default class Slide {
  constructor(wrapper, slide){
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);

    this.distancia = {
      iniciou: 0,
      movimentou: 0,
      terminou: 0
    }
    // Criando novo evento
    this.changeEvent = new Event('changeEvent')
  }
  // Movendo o slide
  moveSlide(distX){
    // criando um novo espaço no meu objeto e guardando o distX
    this.distancia.movePosicao = distX
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  calculandoPosicao(clientX){
    //movimentou recebe distancia.iniciou - o clientX do metodo move
    this.distancia.movimentou = (this.distancia.iniciou - clientX) * 1.4 //multiplicando para aumentar a velocidade
    return this.distancia.terminou - this.distancia.movimentou;
  }

  end(event){
    let eventoTipo = (event.type === 'mouseup') ? 'mousemove' : 'touchmove' ;
    this.wrapper.removeEventListener(eventoTipo, this.move);
    // guardando o valor do meu movePosicao no distancia.terminou (valor pego no movePosicao)
    this.distancia.terminou = this.distancia.movePosicao;
    this.transicao(true);
    this.mudaSlideNoFim();
  }

  move(event){
    let clientX = (event.type === 'mousemove')? event.clientX : event.changedTouches[0].clientX;
    const posicaoFinal = this.calculandoPosicao(clientX);
     
    // usando o valor da variavel (q esta sendo atualizada ao mover)para mover o slide.
    this.moveSlide(posicaoFinal);
  }

  start(event){
    let eventoTipo;
    if(event.type === 'mousedown'){
      event.preventDefault();
      // guardando o valor do primeiro click em inicou
      this.distancia.iniciou = event.clientX;
      eventoTipo = 'mousemove'
    }else if(event.type === 'touchstart'){
      // guardando o valor do primeiro click em inicou
      this.distancia.iniciou = event.changedTouches[0].clientX;
      eventoTipo = 'touchmove'
    }
    this.transicao(false);
    this.wrapper.addEventListener(eventoTipo, this.move)
  }
  // Adiciona eventos
  addEventos(){
    this.wrapper.addEventListener('mousedown', this.start)
    this.wrapper.addEventListener('mouseup', this.end); 
    
    this.wrapper.addEventListener('touchstart', this.start)
    this.wrapper.addEventListener('touchend', this.end); 
    
    window.addEventListener('resize', this.reajustandoSlide)
  }

  centraliza(item){
    // tamanho do meu wrapper  - tamanho do meu item, sobra as margins, dive por 2 e encontra qnt precisa por pra centralizar o item
    const margin = (this.wrapper.offsetWidth - item.offsetWidth) / 2
    console.log(margin);
    // diminuindo o left do item pela metade da margin, passando negativo pra n fica inverso.
    return -(item.offsetLeft - margin)
  }
  // retorna um objeto com meus itens e a posição deles
  slideConfiguracoes(){
    this.arraySlide = [...this.slide.children].map((item, index) => {
      const posicao = this.centraliza(item);  
      return { item, posicao }
    }) 
  }
  // Troca o slide de acordo com o index
  mudaSlide(index){
    const ativaSlide = this.arraySlide[index];
    // ativando slide com a posicao do index passado.
    this.moveSlide(ativaSlide.posicao);
    this.pegandoIndex(index);
    // salvando a posiacao do index no terminou do objeto
    this.distancia.terminou = ativaSlide.posicao;
    this.mostrandoAtivo(index);
    // o wrapper vai emitir meu novo evento sempre que ativa a função
    this.wrapper.dispatchEvent(this.changeEvent);
  }
  // salvando o index dos meus itens em um objeto
  pegandoIndex(index){
    const ultimo = this.arraySlide.length - 1
    this.index = {
      anterior: index ? index - 1: undefined,
      atual: index,
      proximo: (index === ultimo)? undefined: index + 1
    }
  }

  ativandoAnterior(){
    if(this.index.anterior !== undefined) this.mudaSlide(this.index.anterior);
  }

  ativandoProximo(){
    if(this.index.proximo !== undefined) this.mudaSlide(this.index.proximo);
  }

  mudaSlideNoFim(){
    if(this.distancia.movimentou > 150 && this.index.proximo !== undefined){
      this.ativandoProximo();
    }else if(this.distancia.movimentou < -150 && this.index.anterior !== undefined){
      this.ativandoAnterior();
    }else {
      this.mudaSlide(this.index.atual)
    }
  }
  // Ativa transição quando o parametro for == true
  transicao(bollean){
    this.slide.style.transition = bollean ? 'transform .3s' : '';
  }

  mostrandoAtivo(index){
    this.arraySlide.forEach(element => element.item.classList.remove('ativo'))

    this.arraySlide[index].item.classList.add('ativo');
  }
  // Cria navegação 
  criandoNav(){
    const ul = document.createElement('ul')
    this.arraySlide.forEach(() => {
      const li = document.createElement('li');
      ul.appendChild(li);
    })
    ul.classList.add('navSlide');
    this.wrapper.appendChild(ul)
    return ul
  }

  ativandoNavBar(item, index){
    item.addEventListener('click', () => {
      this.mudaSlide(index);  
    })
    // esperando o evento ser emitido para ativar
    this.wrapper.addEventListener('changeEvent', this.ativandoControle)
  }
  // Adiciona os ponteiros de navegação
  adicionandoControle(){
    this.controle = this.criandoNav();
    this.arrayUl = [...this.controle.children];

    this.ativandoControle();
    this.arrayUl.forEach((item, index) => {
      this.ativandoNavBar(item, index);
    })
  }
  // Deixando apenas um item do contorle ativo
  ativandoControle(){
    this.arrayUl.forEach(item => item.classList.remove('ativaNav'))
    this.arrayUl[this.index.atual].classList.add('ativaNav');
  }
  // binds das minhas funções que são passadas como callback
  binds(){
    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.end = this.end.bind(this);

    this.mudaSlide = this.mudaSlide.bind(this);
    this.ativandoControle = this.ativandoControle.bind(this);
  }
  // Mudando o slide a cada 2.5s 
  mudandoComTempo(){
    let index = 0
    setInterval(() => {
      this.mudaSlide(index);
      index === 2 ? index = 0 : index++
    }, 2500)
  }

  init(){
    this.binds();
    this.addEventos();
    this.slideConfiguracoes();
    return this;
  }
}
