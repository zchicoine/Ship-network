=begin
    This file is to test the shipment.rb file in app/models
=end

require 'rails_helper'


describe Shipment do
  # before to run any test create a ship object

  three_days_from_now = Time.now + (60 * 60 * 24 * 3)

  before {
    @shipment_instance = Shipment.new(open_start_date: Time.now , open_end_date:three_days_from_now)
  }

  subject{@shipment_instance}

  describe "Shipment cannot be existed by itself" do

    it {should_not be_valid}

   end

end
