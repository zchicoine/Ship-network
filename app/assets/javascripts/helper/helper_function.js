/***
 * check if the passing parameter is a string.
 * @param string
 * @returns {boolean}
 */
var string_match = function(string){
    if (!(string.match(/[a-zA-Z]/i)) )
        return false;

    return true;
};
