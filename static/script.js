$(document).ready(function(){
  $(".postForm").submit(function(event) {
    event.preventDefault(); 
    var form = $(this);
    var data = form.serialize();
    var url = form.attr('action'); 
    $.post(url, data, function(res) {
      console.log(res);
    });
  });






});
