# catch-redirect-url

Catching redirect url from headers without following it

### Usage
```
var cru = require( 'catch-redirect-url' )
cru( "https://youtu.be/2Tvy_Pbe5NA", function ( url ) {
    console.log( url );
    // -> https://www.youtube.com/watch?v=2Tvy_Pbe5NA&feature=youtu.be
}
```