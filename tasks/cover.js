var phantom = require( "phantom" );

module.exports = function(grunt) {

  grunt.registerTask('cover', 'Get test coverage.', function() {
    //var files = grunt.file.expandFiles(this.file.src);
    // Concat specified files.
    
    //return grunt.utils.spawn( { cmd : 'phantomjs', args : options.args }, function( err, result, code ){
      phantom.create( function( ph ) {
        ph.createPage( function( page ) {
          page.open( "filesystem:http://localhost/temporary/cover.txt", function( status ){
            // The window has loaded.
            if( status === 'success' ){
              var content = page.content();
              grunt.log.writeln( "Got content", content.substr( 0, 100 ) );
            } else {
              grunt.log.writeln( "Arse: " + status );
            }
          });
        });
      });
      
      grunt.log.writeln( "Test" );
    //});
  });

};