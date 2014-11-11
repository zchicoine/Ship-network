
//app

var GlobalViewApp = function(){

    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    this.globalViewInstance = new GlobalView();

};

GlobalViewApp.prototype.start = function(){

    this.globalViewInstance.draw();
}

var GlobalViewAppInstance = new GlobalViewApp();

//end app