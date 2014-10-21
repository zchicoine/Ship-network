/**
 * Created by Mohammed Alnakli on 2014-10-15.
 */

var GlobalView;
GlobalView = function(){

};

GlobalView.prototype.render = function(){

    new GoogleMapApp().start();

}

GlobalView.prototype.draw = function(){

    this.render();
}


update_global = function () {
    default_map_navigate("Global");
}



//app

var GlobalViewApp = function(){

    this.globalViewInstance = new GlobalView();

};

GlobalViewApp.prototype.start = function(){

    this.globalViewInstance.draw();
}

//end app