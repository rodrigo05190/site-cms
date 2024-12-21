import { animate, trigger, transition, style, query, stagger, animateChild, group, state, sequence, keyframes, useAnimation } from '@angular/animations';
import { fadeInRight, fadeInLeft, fadeOutLeft } from 'ng-animate';


export const ativarDesativar =
  trigger('ativarDesativar', [
    transition(':enter', [
      style({ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, overflow: 'hidden' }),  // initial
      animate('.3s ease-in-out',
        style({ opacity: 1, height: '*', marginTop: '*', marginBottom: '*', paddingTop: '*', paddingBottom: '*' }))  // final
    ]),

    transition(':leave', [
      style({ opacity: 1, overflow: 'hidden' }),
      animate('.3s ease-in-out',
        style({ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }))
    ])
  ]);

export const listaEmpreendimentos =
  trigger('listaEmpreendimentos', [
    transition('* => *', [
      query(':enter',
        stagger(100, animateChild())
      )
    ])
  ]);

export const fadeInOut =
  trigger('ativarDesativar', [
    transition(':enter', [
      style({ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, overflow: 'hidden' }),  // initial
      animate('.3s ease-in-out',
        style({ opacity: 1, height: '*', marginTop: '*', marginBottom: '*', paddingTop: '*', paddingBottom: '*' }))  // final
    ]),

    transition(':leave', [
      style({ opacity: 1, overflow: 'hidden' }),
      animate('.3s ease-in-out',
        style({ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }))
    ])
  ]);

// export const fadeSlide =
//   trigger('fadeSlide', [
//     transition(':increment, :enter', [
//       query(':enter', [
//         useAnimation(fadeInRight)
//       ], { optional: true })
//     ]),
//     transition(':decrement, :leave', [
//       query(':leave', [
//         useAnimation(fadeOutLeft)
//       ], { optional: true })
//     ]),
//   ]);



export const animacaoRota =

  trigger('animacaoRota', [

    transition('* <=> inactive', [
      query(':enter', [], { optional: true }),
    ]),


    transition('* <=> *', [
      style({ height: '!' }),
      query(':enter, :leave', style({ top: 0, left: 0 }), { optional: true }),
      query(':enter', style({ opacity: 0, 'z-index': '2' }), { optional: true }),

      group([
        query(':leave',
          animate('.5s ease',
            style({
              opacity: 0,
              /*transform: 'translateY(-10%)'*/
            })

          ), { optional: true }),

        query(':enter',
          animate('1s ease',
            style({
              opacity: 1,
              /*transform: 'translateY(0)'*/
            })

          ), { optional: true }),
      ]),
    ]),

  ]);


