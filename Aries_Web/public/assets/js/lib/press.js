function compress(event, callback){
    var file = event.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var image = $('.avatar');
        image.on('load', function () {
             var square = 700;
             var canvas = document.createElement('canvas');
             canvas.width = square;
             canvas.height = square;
             var context = canvas.getContext('2d');
             context.clearRect(0, 0, square, square);
             var imageWidth;
             var imageHeight;
             var offsetX = 0;
             var offsetY = 0;
            if (this.width > this.height) {
                  imageWidth = Math.round(square * this.width / this.height);
                  imageHeight = square;
                 offsetX = - Math.round((imageWidth - square) / 2);
           } else {
                 imageHeight = Math.round(square * this.height / this.width);
                 imageWidth = square; 
                 offsetY = - Math.round((imageHeight - square) / 2); 
           }
            context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
            var data = canvas.toDataURL('image/jpeg');
            callback(data);
         });
          image.attr('src', e.target.result);
       }; 
     reader.readAsDataURL(file);
}