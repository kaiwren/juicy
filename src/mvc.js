function View(_elements) {
  var map = {};
  $.each(_elements, function(i, element){ map[element.id] = $(element); });
  $.extend(this, map);
}

View.prototype = {
}

function Model(_view) {
  this.view = _view;
}

Model.prototype = {
  buildHandlerWithoutThisHack: function(fn){
    var instance = this;
    return function(e){
      fn.call(instance, e);
    };
  },

  observe: function(elementId, eventName, handlerName){
    this.view[elementId].bind(eventName, this.buildHandlerWithoutThisHack(this[handlerName]));
  },

  onChange: function(e){
    this[e.target.id] = ($(e.target).attr('value'));
  },

  dataBind: function(elementId){
    this.observe(elementId, 'change', 'onChange');
    this[elementId] = '';
  }
}

function Controller(model, view) {
}

Controller.prototype = {

}

