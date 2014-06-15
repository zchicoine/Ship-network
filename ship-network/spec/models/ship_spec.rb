=begin
    This file is to test the ship.rb file in app/models
=end

require 'rails_helper'


describe Ship do 
    # before to run any test create a ship object
    before { @ship_instance = Ship.new(name: "marine prince", type: "SDBC" ,
                     built: "2012") }
    # makes @ship_instance the default subject of the test example so we don't use
    # expect(@ship_instance)
    subject { @ship_instance }
    
    it { should respond_to(:name) }
    it { should respond_to(:type) }
    it { should respond_to(:built) }
    it  { should be_valid }
    
    describe "when name is not present" do
        before { @ship_instance.name = " " }
        it { should_not be_valid }
    end
    
    describe "when ship name is already stored" do
        before do
          #which creates a duplicate ship with the same attributes
          ship_with_same_name = @ship_instance.name
          ship_with_same_name.email = @user.name.upcase
          user_with_same_email.save
        end
        it { should_not be_valid }
    end

    describe "check for invalid attributes for ship" do
        before { 
            @ship_instance.save 
        }

        let(:found_ship){@ship_instance.find_by(name: @ship_instance.name)}
        describe "with invalid built year" do
          let(:ship_for_invalid_built_year) { found_ship.built("2014") }
          it { should_not eq ship_for_invalid_built_year }

          #it {expect(user_for_invalid_password).to be_falsey }
          specify { expect(ship_for_invalid_built_year).to be_falsey }

        end
    end
end 
