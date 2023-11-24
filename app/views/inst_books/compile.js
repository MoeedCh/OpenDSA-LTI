//Create to serve as the JS replacement of the coffeeScript file.

$('.progress-status').text(0 + '/' + 0 + ' (' + 'Please wait...'+ ')');
$('.progress-bar').css('width', 0 + '%').text(0 + '%');
var interval = setInterval(function() {
  $.ajax({
    url: '/progress-job/' + "#{@job.id}",
    success: function(job) {
      var stage;
      var progress;
      // if job is not an object then the long process job is completed successfuly
      if (typeof(job) != 'object') {
        $('.progress').removeClass('active');
        $('.progress-bar').css('width', '100%').text('100%');
        $('.progress-status').text('Book generated successfully.');
        if (Window.ODSA.action_type == 'generate_course') {
          $('[name="generate_course_' + Window.ODSA.inst_book_id + '"]')[0].disabled = false;
          $('[name="generate_course_' + Window.ODSA.inst_book_id + '"]')[0].value = "Re-generate LMS Course";
        } else {
          $('[name="compile_book_' + Window.ODSA.inst_book_id + '"]')[0].disabled = false;
          $('[name="compile_book_' + Window.ODSA.inst_book_id + '"]')[0].value = "Recompile Book";
        }
        clearInterval(interval);
        return;
      }
      // If there are errors
      if (job.last_error != null) {
        $('.progress-status').addClass('text-danger').text(job.progress_stage);
        $('.progress-bar').addClass('progress-bar-danger');
        $('.progress').removeClass('active');
        clearInterval(interval);
      }
      progress = job.progress_current / job.progress_max * 100;
      progress = progress.toFixed(2);
      // In job stage
      if (progress.toString() != 'NaN') {
        $('.progress-status').text(job.progress_current + '/' + job.progress_max + ' (' + job.progress_stage + ')');
        $('.progress-bar').css('width', progress + '%').text(progress + '%');
      }
      return;
    },
    error: function() {
      // Job is no loger in database which means it finished successfuly
      $('.progress').removeClass('active');
      $('.progress-bar').css('width', '100%').text('100%');
      $('.progress-status').text('Book generated successfully.');
      if (Window.ODSA.action_type == 'generate_course') {
        $('[name="generate_course_' + Window.ODSA.inst_book_id + '"]')[0].disabled = false;
        $('[name="generate_course_' + Window.ODSA.inst_book_id + '"]')[0].value = "Re-generate LMS Course";
      } else {
        $('[name="compile_book_' + Window.ODSA.inst_book_id + '"]')[0].disabled = false;
        $('[name="compile_book_' + Window.ODSA.inst_book_id + '"]')[0].value = "Recompile Book";
      }
      clearInterval(interval);
      return;
    }
  });
  return;
}, 5000);


