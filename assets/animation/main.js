function main(){

   var waypoint = new Waypoint({
    element: document.getElementsByClassName('container'),
    handler: function(direction) {
      console.log('Handler triggered in ' + direction + ' direction')
    },
    offset: 'bottom-in-view'
  })


}

