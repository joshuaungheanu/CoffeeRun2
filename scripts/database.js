(function(window) {

  var App = window.App || {};

  function Cashier(cashierId, db) {
    this.cashierId = cashierId;
    this.db = db;
  }

  Cashier.prototype.logPayment = function(payment) {
    console.log("Logging in under " + payment.usermail);
    this.db.add(payment.usermail, payment);
  };

  Cashier.prototype.printPayments = function() {
    var customerPaymentsArray = Object.keys(this.db.getAll());

    console.log("Cashier No." + this.cashierId + " entered ");
    customerPaymentsArray.forEach(function(id) {
      console.log(this.db.get(id));
    }.bind(this));
    console.log(" payments.");
  };
  App.Cashier = Cashier;
  window.App = App;
})(window);
