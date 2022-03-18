import {clientSystem} from './util'
const fixedInput_IOS =()=>{
  if(clientSystem().isIOS){
    setTimeout(function () {
      var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
      window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 300);
  }
}
export {
  fixedInput_IOS
}