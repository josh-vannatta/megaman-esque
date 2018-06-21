import _ from 'lodash';


function component() {
  let element = document.createElement('canvas');
  element.className = 'foo';
  element.id = 'main';
  element.innerHTML = _.join(['howdy', 'patna!']);

  return element;
}

document.getElementById('app').appendChild(component());
