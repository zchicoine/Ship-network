/**
 * Created by Mohammed Alnakli on 2014-10-15.
 */


var GlobalView;
GlobalView = function(){

};

GlobalView.prototype.controller = {
    set_region_highlight_on_the_map: function(){
        region_objects_variable.regions_objects_array().forEach(function(value){
            if(value.region_polygon == undefined){
                value.region_polygon = MAP.initialize.google_polygon(value.fusiontables_properties['coordinates'],
                    value.map_properties['color'], value.map_properties['color'], value.unique_identifier);

                event_listeners_on_the_map(value.region_polygon,value.name);
            }else{
                value.region_polygon.setMap(MAP.google_map());
            }
        })

    }

}
GlobalView.prototype.render = function(){
    this.controller.set_region_highlight_on_the_map();
    GoogleMapAppInstance.start();
}

GlobalView.prototype.draw = function(){
    this.render();
}

update_global = function () {
    default_map_navigate("Global");
}
