jsPsych.plugins['new_day'] = (function(){
    
  var plugin = {};

  plugin.trial = function(display_element, trial){
      // If any arguments to trial are functions, evaluate them!
      trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
      
      // Fill in template HTML
      var trial_content = trial.html.format(trial.day_no + 1, trial.day);
      display_element.html(trial_content);
      
      // Fill in cells of calendar
      display_element.find('.check td').each(function(i){
          if (i < trial.day_no) {
              $(this).addClass('past');
          } else if (i == trial.day_no) {
              $(this).addClass('present');
          } else {
              $(this).addClass('future');
          }
      });
      
      // Press continue button to move to next trial
      display_element.find('.continue').on('click', function(e){
          display_element.empty();
          jsPsych.finishTrial();
      })
  }

  return plugin;

})();