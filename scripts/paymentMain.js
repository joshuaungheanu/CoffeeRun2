(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-coffee-payment=\"form\"]";
  var MODAL_SELECTOR = "[data-coffee-payment=\"modal\"]";
  var MODAL_OPENER = "[data-coffee-payment=\"modal_opener\"]";
  var App = window.App;
  var FormHandler = App.FormHandler;
  var Payment = App.Payment;

  var formHandler = new FormHandler(FORM_SELECTOR);
  var myPayment = new Payment(MODAL_SELECTOR, MODAL_OPENER);

  formHandler.addSubmitHandler(myPayment.completePayment.bind(myPayment));
})(window);
