#
# This is an example VCL file for Varnish.
#
# It does not do anything by default, delegating control to the
# builtin VCL. The builtin VCL is called when there is no explicit
# return statement.
#
# See the VCL chapters in the Users Guide at https://www.varnish-cache.org/docs/
# and https://www.varnish-cache.org/trac/wiki/VCLExamples for more examples.

# Marker to tell the VCL compiler that this VCL has been adapted to the
# new 4.0 format.
vcl 4.0;

# Default backend definition. Set this to point to your content server.
backend default {
    .host = "109.236.84.2";
    .port = "80";
}

import std;

acl purge {
        "localhost";
}

sub vcl_recv {
    # Happens before we check if we have this in cache already.
    #
    # Typically you clean up the request here, removing cookies you don't need,
    # rewriting the request, etc.

    if (req.method != "GET" &&
      req.method != "HEAD" &&
      req.method != "PUT" &&
      req.method != "POST" &&
      req.method != "TRACE" &&
      req.method != "OPTIONS" &&
      req.method != "DELETE") {
        /* while the visitor is using a non-valid HTTP method */
        return (synth(404, "Non-valid HTTP method!"));
    }

    if (req.method != "GET" && req.method != "HEAD") {
        /* We only deal with GET and HEAD by default */
      return (pass);
    }

    if (req.method == "PURGE") {
        if (!client.ip ~ purge) {
            return(synth(405,"Not allowed."));
        }
        return (purge);
    }

    return (hash);
}

sub vcl_backend_response {
    # Happens after we have read the response headers from the backend.
    #
    # Here you clean the response headers, removing silly Set-Cookie headers
    # and other mistakes your backend does.

    # Don't cache 50x responses
    if (beresp.status == 500 || beresp.status == 502 || beresp.status == 503 || beresp.status == 504) {
        return (abandon);
    }

    #set beresp.ttl = std.duration(beresp.http.s-maxage, 1h);

    set beresp.grace = 30m;
    return (deliver);
}

# Only handle actual PURGE HTTP methods, everything else is discarded
sub vcl_purge {
  if (req.method == "PURGE") {
    # restart request
    set req.http.X-Purge = "Yes";
    return (restart);
  }
}

sub vcl_deliver {
    # Happens when we have all the pieces we need, and are about to send the
    # response to the client.
    #
    # You can do accounting or modifying the final object here.
    unset resp.http.Via;
    unset resp.http.Server;
    unset resp.http.X-Varnish;
    unset resp.http.s-maxage;
    if (obj.hits > 0) { # Add debug header to see if it's a HIT/MISS and the number of hits, disable when not needed
        set resp.http.MN-Cache-Status = "HIT";
    } else {
        set resp.http.MN-Cache-Status = "MISS";
    }
}

