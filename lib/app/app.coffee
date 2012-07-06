require [ "app/main" ], ( main ) ->
  value = main.hello "world"
  $message = $ "#message"
  
  if $message.length
    $message.text value
