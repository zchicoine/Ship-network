
var RegionView;
RegionView = function(){
   this.html_classnames ={
        "side_panel":{"body": ".aside_ship_details_table_body",
                      "footer":".aside_ship_details_table_foot"

        }

    }
};
RegionView.prototype.backend = function(region_name){

  var _data;
  var results =   Side_Panel.backend.get_result(region_name,REGION_LEVEL,"json",false);
     results.done( function(data) {
         _data =  data;
    });
    return _data;
}
RegionView.prototype.render = function(region_name){
    $(this.html_classnames.side_panel.body).html(this.backend(region_name).body);
    $(this.html_classnames.side_panel.footer).html(this.backend(region_name).footer);

}

RegionView.prototype.draw = function(region_name){
    this.render(region_name);
}


update_region_view = function(region_name){

    if(region_name.match(/[a-z]/i)){
        MAP.Controller.current_zoom_layer().set(REGION_LEVEL);
        new RegionViewApp().start(region_name);
        refresh_link_list_back_history(region_name,REGION_LEVEL);
        refresh_current_view(region_name);
        setSelectRegion_on_sidebar(region_name);

    }



}

//app

var RegionViewApp = function(){

    this.regionViewInstance = new RegionView();

};

RegionViewApp.prototype.start = function(region_name){
    this.regionViewInstance.draw(region_name);
}

//end app