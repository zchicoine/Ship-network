=begin
    This file is to test the ship.rb file in app/models
=end

require 'rails_helper'


describe ShipDetail do
    # before to run any test create a ship object
    before { @ship_details_instance = ShipDetail.new(
        draft: 23.9 ,built: 2013, tons_per_centimeter: 23.4,flag:"Canada", length_over_all: 244.4,
        beam: 34.4,hatches: 2,intermediate_fuel_oil_180?:0,
        marine_diesel_in_port:34.4, marine_gasoline_oil?:1 ) }

    subject { @ship_details_instance }

    it { should respond_to(:draft) }
    it { should respond_to(:built) }
    it { should respond_to(:tons_per_centimeter) }
    it { should respond_to(:flag) }
    it { should respond_to(:length_over_all) }
    it { should respond_to(:hatches) }
    it { should respond_to(:beam) }
    it { should respond_to(:intermediate_fuel_oil_180?) }
    it { should respond_to(:marine_diesel_in_port) }
    it { should respond_to(:marine_gasoline_oil?) }

    it  { should be_valid }

    describe "validate requirements" do
        before {
            @ship_details_instance.save
        }

        let(:found_ship_details){ShipDetail.find_by_flag("Canada")}
        describe "with invalid built year" do
            before { found_ship_details.built = 2017 }

            it { expect(found_ship_details).to_not be_valid  }

        end
    end

end
