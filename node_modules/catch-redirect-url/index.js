"use strict";

var url = require( "url" );
var protocols = {
    http: require( "http" ),
    https: require( "https" )
};

function cru( host, callback ) {

    var opts = url.parse( host );
    var protocol = opts.protocol.replace( ":", "" );

    protocols[protocol].get( opts, function ( res ) {
        res.on( 'data', function () {} );
        res.on( 'end', function () {
            callback( res.headers && res.headers.location );
        } );
    } );
}

module.exports = cru;