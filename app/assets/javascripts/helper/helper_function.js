/***
 * check if the passing parameter is a string.
 * @param string
 * @returns {boolean}
 */
var string_match = function(string){
    if (string  && (string.match(/[a-zA-Z]/i)) )
        return true;

    return false;
};

var remove_white_space = function(name){
    return name.replace(/\s+/g, '');

};

/**
 * number: an integer
 * word: the word that need to be pluralized
 * pword: the pluralize form of the word
 * return the word either pluralize or not based on the value of the number
 */
var pluralize_word = function(number,word,pword)
{
    if(string_match(word) && string_match(pword))
    if(number > 1 && ! isNaN(number))
        return pword;

    return word;
}


/***
 *  check if the passing parameter is a function
 * @param fun
 * return boolean: true or false
 */
var isFunction = function(fun)
{
    if (typeof(fun) == "function" && typeof fun !== "undefined" && fun)
        return true;

    return false;

}
