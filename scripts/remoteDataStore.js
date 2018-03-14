(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    console.log(key);
    var myObj = {};
    myObj[key] = val;
    console.log(myObj);
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function(key) {
    $.get(this.serverUrl + "?emailAddress=" + key, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    $.ajax(this.serverUrl + "/" + key, {
      type: "DELETE"
    });
    console.log(this.serverUrl + "/" + key);
  };
  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
