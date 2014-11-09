# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141029005802) do

  create_table "brokers", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "username"
    t.string   "encrypted_password",     default: "", null: false
    t.string   "company"
    t.string   "website"
    t.string   "telephone"
    t.string   "country"
    t.string   "city"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "brokers", ["email"], name: "index_brokers_on_email", unique: true
  add_index "brokers", ["reset_password_token"], name: "index_brokers_on_reset_password_token", unique: true
  add_index "brokers", ["username"], name: "index_brokers_on_username", unique: true

  create_table "brokers_shipments", id: false, force: true do |t|
    t.integer "shipment_id"
    t.integer "broker_id"
  end

  create_table "ports", force: true do |t|
    t.string   "name"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "region"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ports", ["name"], name: "index_ports_on_name", unique: true

  create_table "ship_details", force: true do |t|
    t.float    "draft"
    t.integer  "built"
    t.float    "tons_per_centimeter"
    t.string   "flag"
    t.string   "classification_society"
    t.float    "length_over_all"
    t.float    "beam"
    t.integer  "holds"
    t.integer  "hatches"
    t.integer  "gross_registered_tonnage"
    t.integer  "net_registered_tonnage"
    t.float    "total_cubic_meters_GR"
    t.float    "total_cubic_meters_BL"
    t.float    "total_cubic_feet_GR"
    t.float    "total_cubic_feet_BL"
    t.boolean  "intermediate_fuel_oil_180?"
    t.boolean  "intermediate_fuel_oil_380?"
    t.boolean  "marine_diesel_oil?"
    t.float    "laden"
    t.float    "ballast"
    t.integer  "economic"
    t.float    "consumption_at_sea_L"
    t.float    "consumption_at_sea_B"
    t.float    "eco_consumption_L"
    t.float    "marine_diesel_oil_at_sea"
    t.float    "marine_gasoline_oil_at_sea"
    t.float    "consumption_in_port_Working"
    t.float    "consumption_in_port_Idle"
    t.float    "marine_diesel_in_port"
    t.float    "marine_gasoline_oil_in_port"
    t.integer  "number_of_cranes"
    t.float    "crane_capacity"
    t.integer  "combined_crane_capacity"
    t.boolean  "aussie_holds_ladders?"
    t.boolean  "CO2_system_on_board?"
    t.boolean  "twenty_foot_equivalent_unit?"
    t.boolean  "lakes_fitted?"
    t.boolean  "ice_classed?"
    t.boolean  "log_fitted?"
    t.boolean  "grabber?"
    t.boolean  "gearless?"
    t.boolean  "double_hull?"
    t.boolean  "imo_fitted?"
    t.boolean  "appendix_B_fitted?"
    t.boolean  "box_shaped_holds?"
    t.boolean  "cement_holes_fitted?"
    t.boolean  "marine_gasoline_oil?"
    t.integer  "ship_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ship_details", ["ship_id"], name: "index_ship_details_on_ship_id"

  create_table "shipments", force: true do |t|
    t.integer  "port_id"
    t.integer  "ship_id"
    t.date     "open_start_date"
    t.date     "open_end_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "shipments", ["port_id"], name: "index_shipments_on_port_id"
  add_index "shipments", ["ship_id"], name: "index_shipments_on_ship_id"

  create_table "ships", force: true do |t|
    t.string   "name"
    t.integer  "deadweight"
    t.integer  "deadweight_cargo_capacity"
    t.integer  "vessel_type",               default: 0
    t.integer  "vessel_category",           default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ships", ["name"], name: "index_ships_on_name", unique: true

end
