// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require sugar
//= require infobox_packed

///  include global functions and variables first.
//= require global_functions
/// include map
//= require map_subsystem/map
//= require map_subsystem/map_models/map_models
//= require map_subsystem/map_models/countries_coordinates/countries_coordinates
//= require_tree ./map_subsystem/map_models/countries_coordinates
//= require map_subsystem/map_models/backend/map_backend
//= require_tree ./map_subsystem/map_models/backend
//= require_tree ./map_subsystem/map_models
//= require map_subsystem/map_controller/map_controller
//= require_tree ./map_subsystem/map_controller
//= require_tree ./map_subsystem/google_map
//= require_tree ./map_subsystem
/// include the main region class, then drive region classes
//= require region_subsystem/regions/region_class
/// include the rest
//= require_tree .




















