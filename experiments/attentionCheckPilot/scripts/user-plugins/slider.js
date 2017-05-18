jsPsych.plugins['slider'] = (function(){
  
  var plugin = {};

  plugin.trial = function(display_element, trial){
    // If any arguments to trial are functions, evaluate them!
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
    
    // Fill in the blanks
    var agent = trial.agent;    
    var trial_content = trial.html.format(agent.name, agent.abbrev);
    display_element.html(trial_content);
    
    // Add in restaurants
    display_element.find('.restaurant_roster td').each(function(i){
      var resto_img = trial.all_restaurants[i]['img'];
      var img_tag = '<img src = "{0}" class = "restaurant" />'.format(resto_img);
      $(this).append(img_tag);
    });
    
    // Add in agent below restaurants
    var a = trial.agent;
    var img_tag = '<img src = "{0}" id = "{1}" class = "agent" />'.format(a['img'], a['abbrev']);
    display_element.append(img_tag);
    
    // Make slider
    for(var i = 0; i < trial.all_restaurants.length; i++) {
      var restoName = trial.all_restaurants[i]['name'];
      var sliderHtml = '<td><div id="slider{0}{1}"></div></td>'.format(i, agent.name);
      var nameHtml = '<td><p>{0}</p></td>'.format(restoName);
      $(this).append(nameHtml);
      $(this).append(sliderHtml);
      console.log($('#slider{0}{1}'.format(i, agent.name)));
      $('.slider{0}{1}'.format(i, agent.name)).slider();        
      // initialize slider

    });

  }

  return plugin;

})();
