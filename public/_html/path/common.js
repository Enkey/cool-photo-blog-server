$( document ).ready(function(){



var container = $('#gallery');

    container.imagesLoaded(function(){
        container.masonry({         // НЕ находит масонри!
           itemSelector:".item-masonry",
           percentPosition: true
       });

    });

});

