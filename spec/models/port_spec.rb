=begin
    This file is to test the ship.rb file in app/models
=end

require 'rails_helper'


describe Port do
    # before to run any test create a ship object
    before { @port_instance = Port.new(name: "Fredericia", latitude: "55.55",
                                       longitude: "9.75") }
    # makes @ship_instance the default subject of the test example so we don't use
    # expect(@ship_instance)
    subject { @port_instance }

    it { should respond_to(:name) }
    it { should respond_to(:latitude) }
    it { should respond_to(:longitude) }
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
        describe "with invalid latitude " do
            before{ found_port.latitude = 200 }
            # port_instance should not be equal to port_for_invalid_longitude

            it { expect(found_port).to_not be_valid}

        end
        describe "with invalid longitude " do
            before{ found_port.longitude = 400 }
            # port_instance should not be equal to port_for_invalid_longitude

            it { expect(found_port).to_not be_valid}

        end

    end

    describe "relationship with other tables" do
        before {
            # here should create the relationship
            @port_instance.save
            @_ships = Ship.create!([{
                                      name: "genco hunter",
                                      vessel_type: Ship.vessel_types[:ohbs],
                                      built: "2007",
                                     deadweight: 2040,
                                  },
                                  {
                                      name: "oak bay",
                                      vessel_type: Ship.vessel_types[:mpp],
                                      built: "2013",
                                      deadweight: 340,
                                  },
                                  {
                                      name: "hamra",
                                      vessel_type: Ship.vessel_types[:tween],
                                      built: "2001",
                                      deadweight: 2440,
                                  }])
        }
        describe "check for ships relationship" do

            describe "when port has many ships" do
                before {
                    @port_instance.ships = @_ships
                    @port_instance.save
                }
                it { should have_many(:ships).through(:shipments)}
                specify{ expect(@port_instance.ships).to eq @_ships}
            end
        end


    end
end
