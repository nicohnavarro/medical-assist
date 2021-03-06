import { Notyf } from "notyf";

export const ToastNotyf = new Notyf({
  duration: 2000,
  position: {
    x: 'right',
    y: 'top',
  },
  types: [
    {
      type: 'warning',
      background: 'orange',
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'đ¨'
      }
    },
    {
      type: 'error',
      background: 'red',
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'đ§'
      },
      duration: 3000,
      dismissible: true
    },
    {
      type: 'info',
      background: 'blue',
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'âšī¸'
      },
    }
  ]
});