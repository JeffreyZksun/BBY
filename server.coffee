heat = require './heat'
sockets = {}

require('zappajs') ->
  z = @

  @use 'static'

  @get '/': ->
    @render 'main'

  @get '/proxy' : ->
    @render 'proxy', width : @query.width, height : @query.height

  @get '/test' : ->
    @render 'test'

  @get '/send' : ->
    {url, x, y} = @query
    console.log "#{url}:#{x}:#{y}"
    heat.addDataPoint url, x, y

    sockets.emit 'addData', point : x : x, y : y
    @send ''

  @on 'loadData' : (data) ->
    data ?= {url: 'http://192.168.1.198:8080/'}
    sockets = @socket
    @emit 'loadData', points : heat.getHeatMapData data.url
    
