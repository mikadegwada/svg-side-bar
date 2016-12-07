$(function(){


        function SVGMenu( el, options ) {
          this.el = el;
          this.init();
        }

        SVGMenu.prototype.init = function() {

          this.trigger = this.el.querySelector( 'div#fake' );//faux btn a placer avant la sidebar

          this.shapeEl = this.el.querySelector( 'li.sv' ); //la div qui contient le svg

          var s = Snap( this.shapeEl.querySelector( 'svg' ) );
          this.pathEl = s.select( 'path' );
          this.paths = {
            reset : this.pathEl.attr( 'd' ),
            open : this.shapeEl.getAttribute( 'data-morph-open' ),
            close : this.shapeEl.getAttribute( 'data-morph-close' )
          };

          this.isOpen = false;

          this.initEvents();
        };

        SVGMenu.prototype.initEvents = function() {
          this.trigger.addEventListener( 'fakeToogle', this.toggle.bind(this) );
        };

        SVGMenu.prototype.toggle = function() {
          var self = this;

          if( this.isOpen ) {

          
            this.el.classList.remove("isOpening");
            this.el.classList.add("isClosing");

            this.pathEl.stop().animate( { 'path' : this.isOpen ? this.paths.close : this.paths.open }, 100, mina.easeout, function() {
              self.pathEl.stop().animate( { 'path' : self.paths.reset }, 300, mina.easeout );
            } );

        }else {

            this.shapeEl.classList.add('svopen')

            this.pathEl.stop().animate( { 'path' : this.isOpen ? this.paths.close : this.paths.open }, 200, mina.bounce, function() {
            self.pathEl.stop().animate( { 'path' : self.paths.reset }, 600, mina.elastic );
            } );



        }
          
          this.isOpen = !this.isOpen;
        };

        var my_svg = new SVGMenu( document.getElementById( 'menu' ) );

    
    //system de faux clique pour activer le svg

        // Create the event.
        var fakeClickToOpenSideBar = document.createEvent('Event');
        var fakediv = document.getElementById( 'fake' )
        // Define that the event name is 'build'.
        fakeClickToOpenSideBar.initEvent('fakeToogle', true, true);

        // Listen for the event.
        //fakediv.addEventListener('fakeToogle', function (e) {
         //alert("je suis le fake")
        //}, false);

        // target can be any Element or other EventTarget.



    //system de toggle



        var animTime = 700
        var bloqueur = 0
        function simuleToggleSvg () {
          
          if(bloqueur === 0){
            setTimeout(debloque,animTime)
            fakediv.dispatchEvent(fakeClickToOpenSideBar);
            bloqueur = 1
          }
          
        }
        function debloque () {
          bloqueur = 0
        }
        





                // select the target node
        var target = document.getElementById('side-left');     //id de la side bar
         
        // create an observer instance
        var observer = new MutationObserver(function(mutations) {
            var state
            var transform = target.attributes.style.ownerElement.style.transform
            //console.log(transform)
            transform = transform.replace("translateX(","").replace("px)","").replace(")","")
            //console.log(transform)
            if (transform === "0"){
              state = "open"
              my_svg.isOpen = true
              my_svg.el.classList.remove("isClosing");
              my_svg.el.classList.add("isOpening");
            }else if(transform === "-100%"){
              state = "close"
              my_svg.isOpen = false
              my_svg.shapeEl.classList.remove('svopen')
              

            }else {
              state = transform
            }
            simuleToggleSvg(transform === "0")
        });
         
        // configuration of the observer:
        var config = { attributes: true };
         
        // pass in the target node, as well as the observer options
        observer.observe(target, config);
         
     
});

