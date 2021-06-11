import { trigger, transition, style, query, animateChild, group, animate, keyframes } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('home => login', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%'})
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('1000ms ease-out', style({ left: '100%'}))
          ]),
          query(':enter', [
            animate('1000ms ease-out', style({ left: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('login => register', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%'})
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('1000ms ease-out', style({ left: '100%'}))
          ]),
          query(':enter', [
            animate('1000ms ease-out', style({ left: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('register => login', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%'})
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('1000ms ease-out', style({ left: '0%'}))
          ]),
          query(':enter', [
            animate('1000ms ease-out', style({ left: '100%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('login => home', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%'})
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('600ms ease-out', style({ right: '100%'}))
          ]),
          query(':enter', [
            animate('600ms ease-out', style({ right: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('login => registro', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            left: 0,
            width: '100%',
            opacity: 0,
            transform: 'scale(0) translateY(100%)',
          }),
        ]),
        // Animate the new page in
        query(':enter', [
          animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
        ])
      ]),
      transition('registro => home', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            left: 0,
            width: '100%',
          }),
        ]),
        group([
          query(':enter', [
            animate('1000ms ease', keyframes([
              style({ transform: 'scale(0) translateX(100%)', offset: 0 }),
              style({ transform: 'scale(0.5) translateX(25%)', offset: 0.3 }),
              style({ transform: 'scale(1) translateX(0%)', offset: 1 }),
            ])),
          ]),
          query(':leave', [
            animate('1000ms ease', keyframes([
              style({ transform: 'scale(1)', offset: 0 }),
              style({ transform: 'scale(0.5) translateX(-25%) rotate(0)', offset: 0.35 }),
              style({ opacity: 0, transform: 'translateX(-50%) rotate(-180deg) scale(6)', offset: 1 }),
            ])),
          ])
        ]),
      ]),
      transition('home => registro', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            left: 0,
            width: '100%',
            opacity: 0,
            transform: 'scale(0) translateX(100%)',
          }),
        ]),
        // Animate the new page in
        query(':enter', [
          animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
        ])
      ]),
  ]);