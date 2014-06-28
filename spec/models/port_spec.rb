=begin
    This file is to test the ship.rb file in app/models
=end

require 'rails_helper'


describe Port do
    # before to run any test create a ship object
    before { @port_instance = Port.new(name: "Fredericia", latitude_coordinate: "55.55",
                                       longitude_coordinate: "9.75") }
    # makes @ship_instance the default subject of the test example so we don't use
    # expect(@ship_instance)
    subject { @port_instance }

    it { should respond_to(:name) }
    it { should respond_to(:latitude_coordinate) }
    it { should respond_to(:longitude_coordinate) }
    # it { should respond_to(:regin) }
    it { should be_valid }

    describe "when name is not present" do
        before { @port_instance.name = " " }
        it { should_not be_valid }
    end

    describe "when port name is already stored" do
        before do
            #which creates a duplicate ship with the same attributes
            port_with_same_name = @port_instance
            port_with_same_name.name = @port_instance.name.upcase
            port_with_same_name.save
        end
        it { should_not be_valid }
    end

    describe "check for invalid attributes for port" do
        before {
            @port_instance.save
        }

        let(:found_port) { Port.find_by(name: @port_instance.name) }
        describe "with invalid longitude " do
            let(:port_for_invalid_longitude) { found_port.longitude_coordinate = 400 }
            # port_instance should not be equal to port_for_invalid_longitude
            it { should_not eq port_for_invalid_longitude }

            #it {expect(user_for_invalid_password).to be_falsey }
            specify { expect(port_for_invalid_longitude).to be_falsey }

        end

    end

    describe "relationship with other tables" do
        before {
            # here should create the relationship
            @port_instance.save
            ships = Ship.create!([{
                                      name: "genco hunter",
                                      category: "SDBC",
                                      built: "2007",
                                  },
                                  {
                                      name: "oak bay",
                                      category: "Commerce",
                                      built: "2013",

                                  },
                                  {
                                      name: "hamra",
                                      category: "TWEEN",
                                      built: "2001",

                                  }])
        }
        describe "check for ships relationship" do
            before {
                @port_instance.ships = ships
            }
            describe "when port has many ships" do

                it { should have_many(:ship).through(:shipments)}
                specify{ expect(@port_instance.ships).to eq ships}
            end
        end


    end
end
