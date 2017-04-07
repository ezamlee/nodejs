function friendActivity(id, img, name, email, activity)
{
  var blockActivity = '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">';
      blockActivity += '<div class="activity">'
      blockActivity += '<a href="" data-toggle="modal" data-target="#' + id + '"><img src="img/' + img + '"></a>';
      blockActivity += '<h4><a href="" class="text-primary text-thin" data-toggle="modal" data-target="#' + id + '">' + name + '</a></h4>'
      blockActivity += '<h5>' + activity + '</h5>';
      blockActivity += '</div> </div>';

      var modal = '<div id="' + id + '" class="modal fade" role="dialog">';
          modal += '<div class="modal-dialog">';
          modal += '<!-- Modal content-->';
          modal += '<div class="modal-content">';
          modal += '<div class="modal-header">';
          modal += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
          modal += '<h4 class="modal-title">Modal Header</h4>';
          modal += '</div>';
          modal += '<div class="modal-body">';
          modal += '<div class="row">';
          modal += '<div class="col-xs-4 col-xs-offset-2">';
          modal += '<img src="' + img + '">';
          modal += '</div>';
          modal += '<div class="col-xs-6">';
          modal += '<h4>' + name + '</h4>';
          modal += '<h4>' + email + '</h4>';
          modal += '</div></div></div>';
          modal += '<div class="modal-footer">';
          modal += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
          modal += '</div></div></div></div>';

      $('#activities').append(blockActivity);
      $('.boxed').append(modal);
      // return blockActivity;
}
