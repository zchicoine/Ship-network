=begin
    This file is to test the ship.rb file in app/models
=end

require 'rails_helper'


describe Ship_detials do
    # before to run any test create a ship object
    before { @ship_details_instance = 0 }
    # makes @ship_instance the default subject of the test example so we don't use
    # expect(@ship_instance)
    subject { @ship_details_instance }

    describe "Ship details cannot be existed by itself" do

        it {should_not be_valid}

    end
end
