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

ActiveRecord::Schema.define(version: 20140628232148) do

  create_table "ports", force: true do |t|
    t.string   "name"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "region"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

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
    t.integer  "built"
    t.decimal  "draft"
    t.integer  "deadweight"
    t.integer  "beam"
    t.integer  "loa"
    t.string   "vessel_type"
    t.string   "vessel_class"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end