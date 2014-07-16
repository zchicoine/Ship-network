=begin
    This file is to test the ship.rb file in app/models
=end

require 'rails_helper'


describe Ship do 
    # before to run any test create a ship object
    before { @ship_instance = Ship.new(
        name: "marine prince", vessel_type: Ship.vessel_types[:ohbs] ,
        built: "2012", deadweight: 200000, vessel_class:"Capesize",
        draft:9.568, beam:27, loa:190) }
    # makes @ship_instance the default subject of the test example so we don't use
    # expect(@ship_instance)
    subject { @ship_instance }
    
    it { should respond_to(:name) }
    it { should respond_to(:vessel_type) }
    it { should respond_to(:built) }
    it { should respond_to(:vessel_class) }
    it { should respond_to(:deadweight) }
    it { should respond_to(:draft) }
    it { should respond_to(:beam) }
    it { should respond_to(:loa) }

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
          let(:ship_for_invalid_built_year) { found_ship.built = 2017 }
          it { should_not eq ship_for_invalid_built_year }

          #it {expect(user_for_invalid_password).to be_falsey }
          specify { expect(ship_for_invalid_built_year).to be_falsey }

        end
        describe "with invalid deadweight " do
            before{ found_ship.deadweight = -1 }

            #it {expect(user_for_invalid_password).to be_falsey }
            it { expect(found_ship).to validate_numericality_of(:deadweight)}

        end

        describe "with invalid vessel type " do
            before{ found_ship.vessel_type = Ship.vessel_types[17] }

            #it {expect(user_for_invalid_password).to be_falsey }
            it { expect(found_ship).to be_valid}

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
                found_ship.save
                expect(found_ship.vessel_class).to eq "Capesize"
            end
            specify "deadweight between 80000..100000" do
                found_ship.deadweight = 85000
                found_ship.save
                expect(found_ship.vessel_class).to eq "Post-Panamax"
            end

            specify "deadweight between 65000..80000" do
                found_ship.deadweight = 65050
                found_ship.save
                expect(found_ship.vessel_class).to eq "Panamax"
            end

            specify "deadweight between 50000..65000" do
                found_ship.deadweight = 53000
                found_ship.save
                expect(found_ship.vessel_class).to eq "Supramax"
            end
            specify "deadweight between 38000..50000" do
                found_ship.deadweight = 43000
                found_ship.save
                expect(found_ship.vessel_class).to eq "Handymax"
            end
            specify "deadweight between 18000..38000" do
                found_ship.deadweight = 33000
                found_ship.save
                expect(found_ship.vessel_class).to eq "Supramax"
            end
            specify "deadweight between 1000..18000" do
                found_ship.deadweight = 2000
                found_ship.save
                expect(found_ship.vessel_class).to eq "Mini-bulker"
            end


       end

    end
    describe "relationship with other tables," do
        before {
          # here should create the relationship
          @ship_instance.save
          @ports_array = [

              Port.create!(name: 'Ronne', latitude: 55.08333333, longitude: 14.68333333),
              Port.create!(name: 'Djibouti', latitude: 11.6, longitude: 43.13333333),
              Port.create!(name: 'Portsmouth', latitude: 15.56666667, longitude: -61.46666667)

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
