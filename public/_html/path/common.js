$( document ).ready(function(){


var sizer ='.sizer4';
var container = $('#gallery');

    container.imagesLoaded(function(){
        container.masonry({         // НЕ находит масонри!
           itemSelector:".item-masonry",
           //columnWidth : 200,
           //percentPosition: true
       });

    });

});

