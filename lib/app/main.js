/*
 * grunt-sandbox
 * https://github.com/richardbutler/grunt-sandbox
 *
 * Copyright (c) 2012 Richard Butler
 * Licensed under the MIT license.
 */

define([
  "app/echo"
], function( echo ) {
  
  "use strict";
  
  return {
    hello: function( world ) {
      return echo( "Hello " + world );
    }
  };
  
});
