// watch the heatmap of url
function watchUrl(url){
  document.getElementById('watchPage').src = url
}

function setPageSize(width, height){
  style = document.getElementById('watchPage').style
  if(height) {
    style.height = height + 'px'
  }
}

function init(){
  var config = {
      "radius": 30,
      "element": "heatmapEl",
      "visible": true,
      "opacity": 40,
      "gradient": { 0.45: "rgb(0,0,255)", 0.55: "rgb(0,255,255)", 0.65: "rgb(0,255,0)", 0.95: "yellow", 1.0: "rgb(255,0,0)" }
  }

  heatmapEl = document.getElementById('heatmapEl')
  watchPage = document.getElementById('watchPage')
  heatmapEl.style.width = watchPage.offsetWidth + 'px'
  heatmapEl.style.height = watchPage.offsetHeight + 'px'

  
  var heatmap = heatmapFactory.create(config)
  var socket = io.connect('http://localhost:3000')

  url = 'http://192.168.1.198:8080/?bby_admin=1'
  
  socket.on('loading', function (data) {
  })

  socket.on('loadData', function (data){
    heatmap.store.setDataSet({max : 2, data : data.points})
  })
  socket.emit('loadData', {url : url})

  socket.on('addData', function(data){
    point = data.point
    heatmap.store.addDataPoint(point.x, point.y)    
  })

  watchUrl(url)
}

init()

