=begin
    This file is to test the ship.rb file in app/models
=end

require 'rails_helper'


describe Ship do 
    # before to run any test create a ship object
    before { @port_instance = Ship.new(name: "marine prince", type: "SDBC" ,
                     built: "2012") }
    # makes @ship_instance the default subject of the test example so we don't use
    # expect(@ship_instance)
    subject { @port_instance }
    
    it { should respond_to(:name) }
    it { should respond_to(:type) }
    it { should respond_to(:built) }
    it  { should be_valid }
    
    describe "when name is not present" do
        before { @port_instance.name = " " }
        it { should_not be_valid }
    end
    
    describe "when ship name is already stored" do
        before do
          #which creates a duplicate ship with the same attributes
          ship_with_same_name = @port_instance
          ship_with_same_name.name = @port_instance.name.upcase
          user_with_same_email.save
        end
        it { should_not be_valid }
    end

    describe "check for invalid attributes for ship" do
        before { 
            @port_instance.save
        }

        let(:found_ship){@port_instance.find_by(name: @port_instance.name)}
        describe "with invalid built year" do
          let(:ship_for_invalid_built_year) { found_ship.built("2014") }
          it { should_not eq ship_for_invalid_built_year }

          #it {expect(user_for_invalid_password).to be_falsey }
          specify { expect(ship_for_invalid_built_year).to be_falsey }

        end
    end

    describe "check for ship relationship with other tables" do
        before {
          # here should create the relationship
          @port_instance.save
        }
        describe "check for ports relationship"do

          describe "when ship has many ports" do

          end
        end


    end
end 
