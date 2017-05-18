// Fill in blank strings!
// Example:
// 'This is {0} {1}'.format('very', 'useful') => 'This is very useful'

if (!String.prototype.format) {
  String.prototype.format = function() {
    args = arguments;
          
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

// Repeat an array. The argument 'shuff' is True if the elements of the array should be shuffled in each repetition.
// Very useful for interleaving blocks of trials in counterbalancing.
// Example:
// repeatArray([1, 2, 3], 2, true) => [2, 1, 3, 3, 2, 1]

function repeatArray(arr, count, shuff) {
    shuff = shuff || false;
    new_array = new Array();
    
    for(i=0; i<count; i++) {
        p = shuff ? _.shuffle(arr) : (arr);
        new_array = new_array.concat(p);        
    }
    
    return new_array
      
}

// Preloading stimuli
function preloadImage(fname) {
    new Image().src = fname;
}
