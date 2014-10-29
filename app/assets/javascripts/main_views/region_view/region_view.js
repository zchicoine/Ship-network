
var RegionView;
RegionView = function(name){
    this.name = name;
   this.html_classnames ={
        "side_panel":{"body": ".aside_ship_details_table_body",
                      "footer":".aside_ship_details_table_foot"

        }

    }
};
RegionView.prototype.backend = function(){

  var _data;
  var results =   Side_Panel.backend.get_result(this.name,REGION_LEVEL,"json",false);
     results.done( function(data) {
         _data =  data;
    });
    return _data;
}
RegionView.prototype.render = function(){
    refresh_link_list_back_history(this.name,REGION_LEVEL);
    refresh_current_view(this.name);
    setSelectRegion_on_sidebar(this.name);
    var backend_results = this.backend(this.name);
    $(this.html_classnames.side_panel.body).html(backend_results.body);
    $(this.html_classnames.side_panel.footer).html(backend_results.footer);

}

RegionView.prototype.draw = function(){
    MAP.Controller.current_zoom_layer().set(REGION_LEVEL);
    this.render(this.name);
}


//app

var RegionViewApp = function(){

    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
    // keep list of active regions

    this.active_region= {};
    this.add_region = function(name){
        if(this.active_region[name] == undefined) {
            this.active_region[name] = new RegionView(name);
        }else {
            // port has been already created
        }
    }

};

RegionViewApp.prototype.start = function(name){
    if  (string_match(name)){
        this.add_region(name);
        this.active_region[name].draw();

    }else{
        error_message_display("RegionViewApp start function name is not string")
    }

}

var RegionViewAppInstance = new RegionViewApp();
//end app