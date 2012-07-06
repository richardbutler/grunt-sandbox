(function() {

  require(["app/main"], function(main) {
    var $message, value;
    value = main.hello("world");
    $message = $("#message");
    if ($message.length) {
      return $message.text(value);
    }
  });

}).call(this);

(function() {

  define("app/echo", function() {
    return function(message) {
      return "" + message + "!";
    };
  });

}).call(this);

(function() {

  define("app/main", ["app/echo"], function(echo) {
    return {
      hello: function(world) {
        return echo("Hello " + world);
      }
    };
  });

}).call(this);
