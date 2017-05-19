$(document).ready(function(){
    // Hide templates
    $('#templates').hide();

    /*
    STEP 1: INPUTS TO TIMELINE (hard-coded for testing)

    days - Days of the week when agents went to lunch (default = 5 days)
    restaurants - Name and images of restaurants (up to 4 have been designed for now)
    agents - Information about each agent, containing:
        - name
        - path to icon
        - lunch orders for each particular day

    NB: The entry LUNCH should be modified to change the data given. Each entry in the array lunch specifies
    where the agent went to lunch on a particular day. For example agents['a']['lunch'][0] shows where Alice
    went to lunch on Monday ('tt', or 'Taco Time')

    */

    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    days = ['Monday', 'Tuesday']; // For debugging only

    var restaurants = [{key: 'bb', name: 'Burger Barn', img: 'images/trucks/bb.png'},
                      {key: 'ss', name: 'Stirfry Shack', img: 'images/trucks/ss.png'},
                      {key: 'tt', name: 'Taco Town', img: 'images/trucks/tt.png'}];

    var agents = [{name: 'Alice', abbrev: 'A', img: 'images/agents/a.png', 
                   lunch: ['tt', 'tt', 'tt', 'tt', 'tt']},
                  {name: 'Bill', abbrev: 'B', img: 'images/agents/b.png', 
                   lunch: ['tt', 'tt', 'tt', 'tt', 'tt']},
                  {name: 'Claire', abbrev: 'C', img: 'images/agents/c.png', 
                   lunch: ['bb', 'bb', 'bb', 'bb', 'bb']},
                  {name: 'Dylan', abbrev: 'D', img: 'images/agents/d.png', 
                   lunch: ['bb', 'bb', 'bb', 'bb', 'bb']},
                  {name: 'Elliot', abbrev: 'E', img: 'images/agents/e.png', 
                   lunch: ['ss', 'ss', 'ss', 'ss', 'ss']},
                  {name: 'Fiona', abbrev: 'F', img: 'images/agents/f.png', 
                   lunch: ['ss', 'ss', 'ss', 'ss', 'ss']}];
    
    // Preload images
    var restaurant_images = _.pluck(_.values(restaurants), 'img');
    var agent_images = _.pluck(_.values(agents), 'img');
    
    var img_names = restaurant_images.concat(agent_images);
    _.map(img_names, preloadImage);
    
    /*
    STEP 2: ASSEMBLE TIMELINE
    */
    
    // (1) Instructions/backstory
    exp_timeline = [{type: 'instructions',
                    pages: [$('#agent_intro').html(),
                           $('#restaurant_intro').html(),
                           $('#calendar_intro').html()],
                    allow_keys: false,
                    show_clickable_nav: true}];

    // (2) Lunch days
    n_days = days.length;
    n_agents = agents.length;
    for (d = 0; d < n_days; d++) {
        // List of agents displayed each day
        var disp_agents = [];
        
        // Announce new day
        var new_day = {type: 'new_day',
                  day: days[d],
                  day_no: d,
                  html: $('#new_day').html()}

        exp_timeline.push(new_day);
        
        // Shuffle restaurants each day
        var resto_locations = _.shuffle(restaurants);
        
        // Show agents' lunch for each day
        for (a = 0; a < n_agents; a++) {
            var curr_agent = agents[a]
            var curr_resto = _.findWhere(restaurants, {key: curr_agent['lunch'][d]})
            
            disp_agents.push(curr_agent)
            
            var new_lunch = {type: 'lunch',
                            html: $('#lunch').html(),
                            day: days[d],
                            day_no: d,
                            name: agents[a]['name'],
                            abbrev: agents[a]['abbrev'],
                            img: agents[a]['img'],
                            restaurant: curr_resto['name'],
                            all_restaurants: resto_locations,
                            agents: disp_agents.slice()}
            
            exp_timeline.push(new_lunch);
        }
    }
    
    // (3) DVs
  var seating_chart = {type: 'seating_chart',
                       html: $('#seating_chart').html()};

  var unknown_preference = {type: 'button-response',
                            stimulus: $('#unknown_preference').html(),
                            is_html: true,
                            choices: _.pluck(restaurants, 'name')};

  var unknown_group = {type: 'button-response',
                       stimulus: $('#unknown_group').html(),
                       is_html: true,
                       choices: ['table 1', 'table 2', 'table 3', 'table 4']};
    
  exp_timeline.push(seating_chart, unknown_preference, unknown_group);
    
    // All DVs
    var debug_timeline = [seating_chart, unknown_preference, unknown_group];

    jsPsych.init({
        display_element: $('#jspsych-target'),
        timeline: debug_timeline,
        on_finish: function(){
            var data = jsPsych.data.getData();

            // Show data on browser
            jsPsych.data.displayData();
        }
    });
});
