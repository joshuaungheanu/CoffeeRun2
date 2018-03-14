(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-coffee-order=\"form\"]";
  var CHECKLIST_SELECTOR = "[data-coffee-order=\"checklist\"]";
  var SERVER_URL = "http://localhost:2404/coffeeorders";
  var App = window.App;

  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var Truck = App.Truck;
  var RemoteDataStore = App.RemoteDataStore;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);

  var myTruck = new Truck("ncc-1701", remoteDS);
  window.myTruck = myTruck;

  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  //deployd db
  myTruck.db.getAll(function(db_list) {
    db_list.forEach(function(coffeeorder) {
      checkList.addRow.call(checkList, coffeeorder);
    });
  });
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);
})(window);
