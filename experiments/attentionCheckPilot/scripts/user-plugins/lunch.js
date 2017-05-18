jsPsych.plugins['lunch'] = (function(){
  
  var plugin = {};

  plugin.trial = function(display_element, trial){
    // If any arguments to trial are functions, evaluate them!
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
    
    // Fill in the blanks
    var trial_content = trial.html.format(trial.day, trial.name, trial.restaurant, trial.abbrev);
    display_element.html(trial_content);
    
    // Add in restaurants
    display_element.find('.restaurant_roster td').each(function(i){
      var resto_img = trial.all_restaurants[i]['img'];
      var img_tag = '<img src = "{0}" class = "restaurant" />'.format(resto_img);
      $(this).append(img_tag);
    });
    
    // Add in clients below restaurants
    display_element.find('.agent_roster td').each(function(i){
      var curr_resto = $(this);
      
      // Show only agents that went to the particular restaurant
      var agents = _.filter(trial.agents, function(e){
        return e['lunch'][trial.day_no] == trial.all_restaurants[i]['key'];
      });
      
      _.map(agents, function(e, i){
        var img_tag = '<img src = "{0}" id = "{1}" class = "agent" />'.format(e['img'], e['abbrev']);
        curr_resto.append(img_tag);
      });  
    });
    
    // Make current image clickable
    display_element.find('#'+trial.abbrev).on('click', function(){
      // display_element.empty();
      $(this).unbind('click');
      jsPsych.finishTrial();
    });
  }

  return plugin;

})();
