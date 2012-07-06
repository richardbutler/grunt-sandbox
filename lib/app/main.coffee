define "app/main", [ "app/echo" ], ( echo ) ->
  hello: ( world ) ->
    echo "Hello #{ world }"
