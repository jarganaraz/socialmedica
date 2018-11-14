


$('.owl-carousel').owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    items:1,
    center:true,
    loop:true,
    autoplay:true,
    autoplayTimeout:5000,
    //autoWidth:true,
    autoplayHoverPause:true
});

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
   

var waypoint = new Waypoint({
    element: document.getElementById('contadores'),
    handler: function() {
       // counter();
        this.destroy();
      console.log(this.element.id + ' triggers at ' + this.triggerPoint);
    
      
    },
    offset: '75%'
  })