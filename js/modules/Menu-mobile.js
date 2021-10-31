export default function MenuMobile(){

}

const itens = document.querySelectorAll('.informacoes__menu-principal li');
const menu = document.querySelector('.menu__mobile');

const eventos = ['touch', 'click']

eventos.forEach(evento => {
  menu.addEventListener(evento, iniciaMenu)
})

function iniciaMenu(event){ 
  menu.classList.toggle('ativo');
  itens.forEach(item => {
    // Se no click já existir a class 'ativo' ele vai remover a class e o efeito de box shadow
    if(item.classList.contains('ativo')){
      item.classList.remove('ativo');
      item.parentElement.style.boxShadow = '';
    // se no click não existir a class 'ativo' ele vai adicionar a class e o efeito de box shadow
    } else {
      item.classList.add('ativo');
      item.parentElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, .7';
    } 
  })
  // passando o event.currentTarget que é meu button, seu element pai é a ul.
  cliqueFora(event.currentTarget, () => {
    menu.classList.remove('ativo');
    itens.forEach(item => {
      item.classList.remove('ativo')
      item.parentElement.style.boxShadow = '';
    });
  });
}

function cliqueFora(element, callback){
  // Selecionando meu html INTEIRO
  const html = document.documentElement;
  // verificando se já tem o attributo, se não tiver adicione se tiver n faz nada, assim evita adicionar varios eventos ao mesmo item.
  if(!element.hasAttribute('data-clique')){
    // Criando attributo 'data-clique' ao clicar no elemento
    element.setAttribute('data-clique', '');
    eventos.forEach((evento) => {
      html.addEventListener(evento, verCliqueFora)
    })
  }
  function verCliqueFora(event){
    // Verificando se minha ul (element.parentElement) tem o target onde o click do html foi feito, se não conter ativa meu callback, que remove a minha classs
    if(!element.parentElement.contains(event.target)){
      callback();
    }
  }
}