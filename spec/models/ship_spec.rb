=begin
    This file is to test the ship.rb file in app/models
=end

require 'rails_helper'


describe Ship do 
    # before to run any test create a ship object
    before { @ship_instance = Ship.new(
        name: "marine prince", vessel_type: Ship.vessel_types[:ohbs] , deadweight: 200000, vessel_category: Ship.vessel_categories[:Capesize]) }
    # makes @ship_instance the default subject of the test example so we don't use
    # expect(@ship_instance)
    subject { @ship_instance }
    
    it { should respond_to(:name) }
    it { should respond_to(:vessel_type) }
    it { should respond_to(:vessel_category) }
    it { should respond_to(:deadweight) }


    it  { should be_valid }
    
    describe "when name is not present" do
        before { @ship_instance.name = " " }
        it { should_not be_valid }
    end
    
    describe "when ship name is already stored" do
        before do
          #which creates a duplicate ship with the same attributes

          ship_with_same_name = @ship_instance.dup
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

        describe "with invalid deadweight " do
            before{
                found_ship.deadweight = - 1
                found_ship.save
            }

            #it {expect(user_for_invalid_password).to be_falsey }
            it { expect(found_ship).to_not be_valid }

        end

        describe "with invalid vessel type " do
            before{
                found_ship.vessel_type = Ship.vessel_types[17]
                found_ship.save
            }

            it { expect(found_ship).to_not be_valid}

        end
    end
    describe "validate requirements" do
        before {
            @ship_instance.save
        }

        let(:found_ship){Ship.find_by(name: @ship_instance.name)}
       describe "match vessel category with deadweight" do

            specify "deadweight greater than 100000" do
                found_ship.deadweight = 200000
               if found_ship.save
                    expect(found_ship.vessel_category).to eq 'Capesize'
                end
            end
            specify "deadweight between 80000..100000" do
                found_ship.deadweight = 85000
               if found_ship.save
                    expect(found_ship.vessel_category).to eq 'PostPanamax'
                end
            end

            specify "deadweight between 65000..80000" do
                found_ship.deadweight = 65050
                if found_ship.save
                expect(found_ship.vessel_category).to eq 'Panamax'
                end
            end

            specify "deadweight between 50000..65000" do
                found_ship.deadweight = 53000
                if found_ship.save
                    expect(found_ship.vessel_category).to eq 'Supramax'

                end

            end
            specify "deadweight between 38000..50000" do
                found_ship.deadweight = 43000
                if found_ship.save
                    expect(found_ship.vessel_category).to eq 'Handymax'
                end
            end
            specify "deadweight between 18000..38000" do
                found_ship.deadweight = 33000
                if found_ship.save
                    expect(found_ship.vessel_category).to eq 'Supramax'
                end

            end
            specify "deadweight between 1..18000" do
                found_ship.deadweight = 2000
               if found_ship.save
                   expect(found_ship.vessel_category).to eq 'Minibulker'
               end

            end


       end

    end
    describe "relationship with other tables," do
        before {
          # here should create the relationship
          @ship_instance.save
          @ports_array = [

              Port.create!(name: 'Ronne', latitude: 55.08333333, longitude: 14.68333333, region: "North America"),
              Port.create!(name: 'Djibouti', latitude: 11.6, longitude: 43.13333333 , region: "Europe"),
              Port.create!(name: 'Portsmouth', latitude: 15.56666667, longitude: -61.46666667 , region: "South America")

          ]
          @shipments_array = [

              Shipment.new(open_start_date: Time.now, open_end_date: 55.08333333, port: @ports_array[0]),
              Shipment.new(open_start_date: 'Djibouti', open_end_date: 11.6,  port: @ports_array[1]),
              Shipment.new(open_start_date: 'Portsmouth', open_end_date: 15.56666667, port: @ports_array[2])

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

          specify{ expect(@ship_instance.shipments).to eq @shipments_array}

            # it "should not be able to update shipments attributes unless it goes through ports " do
            #
            #    #  expect(@ship_instance.shipments.first.update(open_start_date: Time.new(2014,2,2))).to be_falsey
            #
            # end


        end
        describe "check for ship details relationship" do
            before {

            }




        end


    end
end 
