jsPsych.plugins['lunch'] = (function(){
    
  var plugin = {};

  plugin.trial = function(display_element, trial){
      // If any arguments to trial are functions, evaluate them!
      trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
      
      // Fill in the blanks
      var trial_content = trial.html.format(trial.day, trial.name, trial.restaurant, trial.abbrev)
      display_element.html(trial_content);
      
      // Add in restaurants
      display_element.find('.restaurant_roster td').each(function(i){
          
          var resto_img = trial.all_restaurants[i]['img']
          var resto_name = trial.all_restaurants[i]['name']
          var img_tag = '<img src = "{0}" class = "restaurant" id = "{1}"/>'.format(resto_img, resto_name);
          
          $(this).append(img_tag)
      });
      
      // Lines 24-31 display a single agent at a time
      // Which restaurant did the current agent visit?
      var resto_names = _.pluck(trial.all_restaurants, 'name');
      var resto_idx = resto_names.indexOf(trial.restaurant);
      var resto_selector = '.agent_roster td:nth-child({0})'.format(resto_idx+1);
      var curr_resto = display_element.find(resto_selector);
      
      console.log(resto_idx)
      console.log(resto_selector)
      console.log(curr_resto)
      
      // Add in single client below restaurant
      var img_tag = '<img src = "{0}" id = "{1}" class = "agent" />'.format(trial.img, trial.abbrev);
      curr_resto.append(img_tag);
      
      // Uncomment this block to show multiple agents at a time
      /* 
      // Add in clients below restaurants
      display_element.find('.agent_roster td').each(function(i){
          var curr_resto = $(this)
          
          // Show only agents that went to the particular restaurant
          var agents = _.filter(trial.agents, function(e){
              return e['lunch'][trial.day_no] == trial.all_restaurants[i]['key']
          });
                    
          console.log(agents)
          _.map(agents, function(e, i){
              console.log(e)
              
              var img_tag = '<img src = "{0}" id = "{1}" class = "agent" />'.format(e['img'], e['abbrev']);
              curr_resto.append(img_tag);
          });  
      });
      */
      
      // Make current image clickable
      display_element.find('#'+trial.abbrev).on('click', function(){
          display_element.empty();
          $(this).unbind('click');
          jsPsych.finishTrial();
      });
  }

  return plugin;

})();