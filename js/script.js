import Slide from "./modules/Slide.js";
import PizzaEfeito from "./modules/Pizza-name.js";
import MenuMobile from "./modules/Menu-mobile.js"

const slide = new Slide('.slide__chefes-wrapper', '.slide__chefes').init();

slide.mudaSlide(0);
slide.adicionandoControle();
slide.mudandoComTempo();

const pizzaEfeito = new PizzaEfeito('.pizza__name .pizza__name-itens', '.pizza__name-texto-div').init();

MenuMobile();


// function verCulpado(){
//   var docWidth = document.documentElement.offsetWidth;

//   [].forEach.call(
//     document.querySelectorAll('*'),
//     function(el) {
//       if (el.offsetWidth > docWidth) {
//         console.log(el);
//       }
//     }
//   );
// }

// verCulpado();