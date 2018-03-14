(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function Payment(selector, modal_opener) {
    if (!selector) {
      throw new Error("No selector provided");
    } else if (!modal_opener) {
      throw new Error("modal opener anchor tag not provided");
    }

    this.$element = $(selector);
    this.modal_opener = modal_opener;
    if (this.$element.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  //This is what we want to run on submit
  Payment.prototype.completePayment = function(paymentData) {
    var modal_element = new Modal(paymentData);

    this.$element.append(modal_element.$element); //append modal element in html
    $(this.modal_opener).click(); //click on the <a> tag that turns on the modal
  };

  //Creates modal element based on form data
  function Modal(paymentData) {
    var $div = $("<div></div>", {
      "id": "ex1",
      "class": "modal"
    });

    var $p = $("<p></p>");

    var $a = $("<a></a>", {
      "href": "#",
      "rel": "modal:close"
    });

    var p_text = "Thank you for your payment, " + paymentData.username;
    var a_text = "Close";

    $a.append(a_text);
    $p.append(p_text);
    $div.append($p);
    $div.append($a);

    this.$element = $div;
  }

  App.Payment = Payment;
  window.App = App;
})(window);
