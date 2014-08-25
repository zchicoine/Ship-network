var curr_array;



function Field(val){
    curr_array = val;
   
    this.getValue = function(){
        return curr_array;
    };
   
    this.setValue = function(val){
        curr_array = val;
    };
}
