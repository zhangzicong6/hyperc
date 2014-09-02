function loadImages(sources,callback){    
    var loadedImages = 0;    
    var numImages = 0;
    for(var i in sources){
    	numImages++;
    }
    var images = {}; 
    for (var src in sources) {    
        images[src] = new Image();
        images[src].onload = function(){ 
            if (++loadedImages >= numImages) {    
                callback(images);    
            }    
        };  
        images[src].src = sources[src];    
    }    
}