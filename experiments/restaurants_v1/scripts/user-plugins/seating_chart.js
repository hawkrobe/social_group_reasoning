jsPsych.plugins['seating_chart'] = (function(){
    var plugin = {};
    
    plugin.trial = function(display_element, trial){
        // If any arguments to trial are functions, evaluate them!
        trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
      
        // Fill in content
        display_element.html(trial.html);
      
        // Create draggable agents
        display_element.find('#pool').sortable({
            items: 'img',
            connectWith: '.table'
        });
    
        // Connect first table
        display_element.find('.table').sortable({
            items: 'img',
            connectWith: ['#pool', '.table']
        });
    
        // Add up to 6 tables
        display_element.find('#add_table').on('click', function(){
            var n_tables = display_element.find('.table').length;

            if (n_tables < 6) {
                // Create table object
                var table_txt = '<div class = "table"><h3>Table {0}</h3></div>'.format(n_tables + 1);
                $('#tables').append(table_txt);

                // Connect new table to pool
                console.log($('.table').last().html())
                
                $('.table').last().sortable({
                    items: 'img',
                    connectWith: ['#pool', '.table']
                })
            }
        });
    
        // Remove empty tables
        display_element.find('#delete_table').on('click', function(){
            var all_tables = display_element.find('.table')
            var n_tables = all_tables.length;

            // Look for empty tables
            var empty_tables = all_tables.filter(function(i){
                var n_agents = $(this).find('img').length;

                return n_agents === 0
            });

            // Remove last empty table
            if (n_tables > 1) {
                empty_tables.last().remove();
            }
            
            // Relabel remaining tables
            var remaining_tables = display_element.find('.table');
            remaining_tables.each(function(i){
                var table_label = 'Table ' + (i+1);
                $(this).find('h3').html(table_label)
            });
            
            
        });
        
        // Enable continue button if all agents have been assigned
        display_element.find('#pool').on('sortout', function(event, ui){  
            console.log(this)
            var remaining_agents = $(this).children('img').length - 2;
            console.log(remaining_agents)
            
            
            if (remaining_agents === 0) {
                var button = display_element.find('button');
                button.removeClass('continue-inactive');
                button.addClass('continue');
                
                // Save data
                button.on('click', function(event, ui){
                    var all_tables = display_element.find('.table')
                    
                    var seating_obj = all_tables.map(function(){
                        // Get all agents sitting at the table
                        var agent_imgs = $(this).find('img');
                        
                        // Return ids
                        var agent_ids = agent_imgs.map(function(){
                            return $(this).attr('data-val');
                        });
                        
                        return agent_ids
                                            
                    });
                    
                    var seating = seating_obj.toArray();
                    
                    display_element.empty();
                    jsPsych.finishTrial({seating: seating});
                });
                
            }
        });
        
      
  }

  return plugin;

})();