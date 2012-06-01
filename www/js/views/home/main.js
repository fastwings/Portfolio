// Filename: views/home/main
define([
  'jquery',
  'underscore',
  'backbone',
  'Three',
  'text!templates/home/main.html',
  'Detector',
  'order!Portfolio/Portfolio',
  'order!Portfolio/Utills',
  'order!Portfolio/Exceptions/ApplicationException',
  'order!Portfolio/Exceptions/SceneException',
  'order!Portfolio/Evniermant/World',
  'order!Portfolio/Evniermant/LoaderScene',
  'order!Portfolio/Evniermant/Camera'
], function($, _, Backbone,Three, mainHomeTemplate){

  var mainHomeView = Backbone.View.extend({
    el: $("#page"),
    render: function(){
      this.el.html(mainHomeTemplate);
      if ( ! window.Detector.webgl ) Detector.addGetWebGLMessage();
      else {
        window.Portfolio.Init($(".World"));
      }
    }
  });
  return new mainHomeView;
});
