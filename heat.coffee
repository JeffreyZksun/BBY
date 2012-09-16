maps = {}

exports.addDataPoint = (url, x, y) ->
  map = maps[url]
  if not map
    maps[url] = map = {}
  
  key = "#{x}-#{y}"
  count = map[key]
  if not count
    count = 0
  count++
  map[key] = count

exports.getHeatMapData = (url) ->
  data = []
  map = maps[url]
  if map
    for key, value of map
      point = key.split '-'
      data.push
        x : parseInt point[0]
        y : parseInt point[1]
        count : value

  data
