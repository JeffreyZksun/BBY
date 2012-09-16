html ->
  head ->
    title -> "Big Brother is watching You!"

  body style : 'margin:0', ->
    div id : 'heatmapEl', style : 'position:absolute;'
    iframe id : 'watchPage', frameborder : 0, width : '100%', height: '100%'

    script src : '/socket.io/socket.io.js'
    script src : '/js/heatmap.js'
    script src : '/js/main.js'

