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

ActiveRecord::Schema.define(version: 20140616224007) do

  create_table "ports", force: true do |t|
    t.string   "name"
    t.float    "latitude_coordinate"
    t.float    "longitude_coordinate"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "shipments", force: true do |t|
    t.integer  "port_id"
    t.integer  "ship_id"
    t.datetime "open_start_date"
    t.datetime "open_end_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ships", force: true do |t|
    t.string   "name"
    t.string   "category"
    t.string   "built"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
