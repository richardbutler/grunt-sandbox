require( [ "app/main" ], function( main ) {
  
  var value = main.hello( "world" ),
      $message = $( "#message" );
      
  if ( $message.length > 0 ) {
    $message.text( value );
  }
  
});
