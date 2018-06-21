// import _ from 'lodash';

// require('bootstrap');

function component() {
  let element = document.createElement('canvas');
  element.className = 'w-100';
  element.id = 'main';
  // element.innerHTML = _.join(['howdy', 'patna!']);

  return element;
}

document.getElementById('app').appendChild(component());
