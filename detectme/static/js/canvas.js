
var canvasModule =  (function(){
  var _canvas = document.getElementById('detecting-canvas');
  var _ctx = _canvas.getContext('2d');

  return{
    settings: {
      numArticles: 5,
      articleList: $("#article-list"),
      moreButton: $("#more-button")
    },

    drawDot: function(x,y){
      _ctx.fillRect(x,y,2,2);
    },

    drawRectangle: function(x,y,w,h){
      _ctx.strokeStyle = 'red';
      _ctx.lineWidth = 5;
      _ctx.strokeRect(x,y,w,h);

    },

    drawUnitaryRectangle: function(x,y,w,h){
      this.drawRectangle(x*_canvas.width, y*_canvas.height, w*_canvas.width, h*_canvas.height);
    },

    clearScreen: function(){
      _canvas.width = _canvas.width;
    },

    setColor: function(color){
      _ctx.strokeStyle = color;
    }

  };

}());

var boundingBox =  (function(){

  var _x,_y,_w,_h;
  
  return{

    setBoxFromReceived: function(bb){
      _x=bb.xcoord;
      _y=bb.ycoord;
      _w=bb.width;
      _h=bb.height;
    },
    drawBox: function(bb){
      this.setBoxFromReceived(bb);
      canvasModule.clearScreen();

      var img = new Image();
      img.src = document.getElementById('detecting-image').src;
      document.getElementById('detecting-canvas').width = img.width;
      document.getElementById('detecting-canvas').height = img.height;
      
      if(img.height/img.width > 1){
        canvasModule.drawUnitaryRectangle(_x,_y,_w,_h);
      }else{
        canvasModule.drawUnitaryRectangle(_y,_x,_h,_w);
      }

      
    }
  };

}());

// EVENT HANDLERS

$('#clear-button').click(function() {
  canvasModule.clearScreen();
});

$('#select-color').change(function () {
  canvasModule.setColor($('#select-color option:selected').val());
});



// window.onload = function() {
//     var myCanvas = document.getElementById("boxPosition");
//     var curColor = $('#selectColor option:selected').val();
//     if(myCanvas){
//       var isDown      = false;
//       var ctx = myCanvas.getContext("2d");
//       var canvasX, canvasY;
//       ctx.lineWidth = 5;
       
//       $(myCanvas)
//       .mousedown(function(e){
//         isDown = true;
//         ctx.beginPath();
//         canvasX = e.pageX - myCanvas.offsetLeft;
//         canvasY = e.pageY - myCanvas.offsetTop;
//         ctx.moveTo(canvasX, canvasY);
//       })
//       .mousemove(function(e){
//         if(isDown !== false) {
//         canvasX = e.pageX - myCanvas.offsetLeft;
//         canvasY = e.pageY - myCanvas.offsetTop;
//         ctx.lineTo(canvasX, canvasY);
//         ctx.strokeStyle = curColor;
//         ctx.stroke();
//         }
//       })
//       .mouseup(function(e){
//         isDown = false;
//         ctx.closePath();
//       });
//     }
    
//     function drawDot(x,y){
//       ctx.fillRect(x,y,2,2); // fill in the pixel at (10,10)
//     }


//     $('#selectColor').change(function () {
//     curColor = $('#selectColor option:selected').val();
//     });
//   };