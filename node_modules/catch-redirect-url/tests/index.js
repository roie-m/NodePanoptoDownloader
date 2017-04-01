var test = require( 'tap' ).test;
var cru = require( '../index' );

var source = "https://youtu.be/2Tvy_Pbe5NA";
var target = "https://www.youtube.com/watch?v=2Tvy_Pbe5NA&feature=youtu.be";

test( "Catch Redirect URL", function ( tap ) {

    cru( source, function ( res ) {

        tap.equal( target, res, ' url should be equal' );

        cru( target, function ( res ) {
            tap.equal( undefined, res, ' this should be undefined' );
            console.log( res );
            tap.end();
        } );

    } );

} );