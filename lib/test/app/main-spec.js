require(['app/echo'], function( echo ) {

  describe( "hello", function() {
    it( "should know what to do with the world", function( test ) {
      //expect( sandbox.hello( "world" ) ).toBe( "Hello world!" );
      expect( echo( "world" ) ).toBe( "world!" );
    });
  });

});
