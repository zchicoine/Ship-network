=begin
    This file is to test the ship.rb file in app/models
=end

require 'rails_helper'


describe Ship do 
    # before to run any test create a ship object
    before { @ship_instance = Ship.new(name: "marine prince", category: "SDBC" ,
                     built: "2012") }
    # makes @ship_instance the default subject of the test example so we don't use
    # expect(@ship_instance)
    subject { @ship_instance }
    
    it { should respond_to(:name) }
    it { should respond_to(:category) }
    it { should respond_to(:built) }
    # it { should respond_to(:built) }
    # it { should respond_to(:built) }
    # it { should respond_to(:built) }
    # it { should respond_to(:built) }
    # it { should respond_to(:built) }

    it  { should be_valid }
    
    describe "when name is not present" do
        before { @ship_instance.name = " " }
        it { should_not be_valid }
    end
    
    describe "when ship name is already stored" do
        before do
          #which creates a duplicate ship with the same attributes
          ship_with_same_name = @ship_instance
          ship_with_same_name.name = @ship_instance.name.upcase
          ship_with_same_name.save
        end
        it { should_not be_valid }
    end

    describe "check for invalid attributes for ship" do
        before {
          @ship_instance.save
        }

        let(:found_ship){Ship.find_by(name: @ship_instance.name)}
        describe "with invalid built year" do
          let(:ship_for_invalid_built_year) { found_ship.built = 2014 }
          it { should_not eq ship_for_invalid_built_year }

          #it {expect(user_for_invalid_password).to be_falsey }
          specify { expect(ship_for_invalid_built_year).to be_falsey }

        end
    end

    describe "relationship with other tables," do
        before {
          # here should create the relationship
          @ship_instance.save
          @ports_array = [

              Port.create!(name: 'Ronne', latitude_coordinate: 55.08333333, longitude_coordinate: 14.68333333),
              Port.create!(name: 'Djibouti', latitude_coordinate: 11.6, longitude_coordinate: 43.13333333),
              Port.create!(name: 'Portsmouth', latitude_coordinate: 15.56666667, longitude_coordinate: -61.46666667)

          ]
          @shipments_array = [

              Shipment.create!(open_start_date: Time.now, open_end_date: 55.08333333),
              Shipment.create!(open_start_date: 'Djibouti', open_end_date: 11.6),
              Shipment.create!(open_start_date: 'Portsmouth', open_end_date: 15.56666667)

          ]
        }

        describe "check for ports relationship" do


          describe "when ship has many ports" do
            before {
              @ship_instance.ports = @ports_array
              @ship_instance.save
            }
            it { should have_many(:ports).through(:shipments)}
            specify{ expect(@ship_instance.ports).to eq @ports_array}



          end


        end
        describe "check for shipment relationship" do
          before {
            @ship_instance.shipments = @shipments_array

          }

          specify{ expect(@ship_instance.shipments).to_not eq @shipments_array}

            it "should not be able to update shipments attributes unless it goes through ports " do

                 expect(@ship_instance.shipments.first.update(open_start_date: Time.new(2014,2,2))).to be_falsey

            end


        end


    end
end 
