$(function () {
    $('.btn').popover({
        content: function() {
          // do anything you want here.
          
          $('.btn').popover('hide');
    
          return 'this appears for all the popovers!  The button you clicked said: "' + $(this).html() + '"';
        }
      });
    // $('.popoverclick').popover();
    // $('.popover-dismiss').popover({
    //     trigger: 'focus'
    // })
})