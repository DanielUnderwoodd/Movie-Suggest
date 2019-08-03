
$(document).ready(function(){

    $('.delete_movie').on('click', function(e){
      $target = $(e.target);

      const id = $target.attr('data_id');
      $.ajax({
        
        type:'DELETE',
        url: '/movie/'+ id,
       

        success: function(response){
        window.location.href= "/"
        
        },
        error: function(err){


        },
      
        
      
         
            
        
      });
    });
  });
  