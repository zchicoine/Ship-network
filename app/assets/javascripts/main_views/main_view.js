
var current_view =
{
    // default
    layer_level: GLOBAL_LEVEL,
    get value (){
        return   this.layer_level;
    },
    set value(layer){
        this.layer_level = layer;
    }
}
var current_location =
{
    // default
    location: COME_FROM_START,
    get value (){
        return   this.location;
    },
    set value(l){
        this.location = l;
    }
}

var current_region =
{
    // default
    region: "Global",
    get value (){
        return   this.region;
    },
    set value(l){
        this.region = l;
    }
    //var region_name =  $("#side_bar_header_region_name").text();
    //return region_name.trim();
}

// MainViewGenerator class

var MainViewGenerator;
MainViewGenerator = (function ()
{

}).once();

MainViewGenerator.prototype.globalView = function()
{
    // enable  navigate the map when the user on global layer
    enable_map_navigate = true;
    GlobalViewAppInstance.start();
    current_view.value = GLOBAL_LEVEL;

}
MainViewGenerator.prototype.regionView = function(name)
{
    // enable  navigate the map when the user on region layer
    enable_map_navigate = true;
    RegionViewAppInstance.start(name);
    current_region.value = name;
    current_view.value = REGION_LEVEL;

}
MainViewGenerator.prototype.portView = function(name,coordinates)
{
    if(coordinates != undefined)
    PortViewAppInstance.add_port(name,coordinates);

    // disable  navigate the map when the user on port layer
    enable_map_navigate = false;
    PortViewAppInstance.start(name);
    current_view.value = PORT_LEVEL;
}
MainViewGenerator.prototype.shipView = function(name)
{
    // disable  navigate the map when the user on ship layer
    enable_map_navigate = false;
    ShipViewAppInstance.start(name);
    current_view.value = SHIP_LEVEL;
}

var MainViewGeneratorInstance = new MainViewGenerator();

