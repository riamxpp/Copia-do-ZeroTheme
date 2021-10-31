export default class PizzaEfeito {
  constructor(caixaItem, texto){
    this.caixaItem = document.querySelectorAll(caixaItem);
    this.texto = document.querySelectorAll(texto);

    this.mouseEntrou = this.mouseEntrou.bind(this);
    this.mouseSaiu = this.mouseSaiu.bind(this);
    this.eventosOver = ['mouseover', 'touchover'];
    this.eventosLeave = ['mouseleave', 'touchleave'];
  }

  mouseSaiu(){
    // Removendo a class 'ativo' do meu texto
    this.atualImagem.classList.remove('ativo');
   
    // Removendo a class 'ativo' do meu Texto
    this.divTexto.classList.remove('ativo');
    this.arrayTexto[0].innerText = 'Pizza Name';
    this.arrayTexto[1].innerText = '#Category';
  }

  mouseEntrou(event){  
    // Pega a div exata em que o mouse está em cima de poem uma class 'ativo'.
    const divIMG = event.currentTarget.children[1];
    this.atualImagem = divIMG.children[0];
    this.atualImagem.classList.add('ativo');

    // Pega a div que estão meus texto, adiciona uma class 'ativoa' e transforma meus 2 para em uma array
    this.divTexto = event.currentTarget.children[0];
    this.divTexto.classList.add('ativo');
    this.arrayTexto = [...this.divTexto.children];
    this.arrayTexto[0].innerText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni quisquam tenetur, nisi veniam minima deserunt magnam eos in voluptatum ut.';
    this.arrayTexto[1].innerText = '';
  }

  addEventos(){
    this.eventosOver.forEach(evento => {
      this.caixaItem.forEach(item => item.addEventListener(evento, this.mouseEntrou));
    })
    this.eventosLeave.forEach(evento => {
      this.caixaItem.forEach(item => item.addEventListener(evento, this.mouseSaiu));
    })
  }

  init(){
    this.addEventos();
    return this
  }
}