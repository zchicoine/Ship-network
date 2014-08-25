require 'rails_helper'

describe Broker do
    before { @broker_instance =  Broker.new(username: "Mohammed", password: "shipment",
                                                email: "hah_m14@yahoo.com")
    }
    # makes @ship_instance the default subject of the test example so we don't use
    # expect(@ship_instance)
    subject { @broker_instance }

    it { should respond_to(:username) }
    it { should respond_to(:email) }
    it { should respond_to(:password) }

    it { should be_valid }
    describe "check for invalid attributes " do

        describe "when username is not present" do
            before { @broker_instance.username = " " }
            it { should_not be_valid }
        end
        describe "when email is not present" do
            before { @broker_instance.email = " " }
            it { should_not be_valid }
        end
        describe "when password is not present" do
            before { @broker_instance.password = " " }
            it { should_not be_valid }
        end

        describe "when username is already stored" do
            before do
                #which creates a duplicate broker with the same attributes
                broker_with_same_name = @broker_instance.dup
                broker_with_same_name.username = @broker_instance.username.upcase
                broker_with_same_name.save
            end
            it { should_not be_valid }
        end
        describe "when email is already stored" do
            before do
                #which creates a duplicate broker with the same attributes
                broker_with_same_email = @broker_instance.dup
                broker_with_same_email.email = @broker_instance.email.upcase
                broker_with_same_email.save
            end
            it { should_not be_valid }
        end


    end

    describe "relationship with other tables," do
        before {
            # here should create the relationship
            @broker_instance.save

            @_ships = Ship.create!([{
                                        name: "genco hunter",
                                        vessel_type: Ship.vessel_types[:ohbs],
                                        vessel_category: Ship.vessel_categories[:Capesize],
                                        deadweight: 2040000,
                                    },
                                    {
                                        name: "oak bay",
                                        vessel_type: Ship.vessel_types[:mpp],
                                        vessel_category: Ship.vessel_categories[:MiniBulker],
                                        deadweight: 340,
                                    },
                                    {
                                        name: "hamra",
                                        vessel_type: Ship.vessel_types[:tween],
                                        vessel_category: Ship.vessel_categories[:MiniBulker],
                                        deadweight: 2440,
                                    }])

            @ports_array = [

                Port.create!(name: 'Ronne', latitude: 55.08333333, longitude: 14.68333333, region: "North America"),
                Port.create!(name: 'Djibouti', latitude: 11.6, longitude: 43.13333333 , region: "Europe"),
                Port.create!(name: 'Portsmouth', latitude: 15.56666667, longitude: -61.46666667 , region: "South America")

            ]
            @shipments_array = [

                Shipment.create!(open_start_date: Time.now, open_end_date: 55.08333333, port: @ports_array[0] , ship: @_ships[0]),
                Shipment.create!(open_start_date: 'Djibouti', open_end_date: 11.6,  port: @ports_array[1],  ship: @_ships[1]),
                Shipment.create!(open_start_date: 'Portsmouth', open_end_date: 15.56666667, port: @ports_array[2], ship: @_ships[2])

            ]
        }

        describe "check for shipments relationship" do


            describe "when broker has many shipments" do
                before {
                    @broker_instance.shipments = @shipments_array

                }

                specify{ expect(@broker_instance.shipments).to eq @shipments_array}


            end


        end



    end

end