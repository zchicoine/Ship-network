class CreateShipEmailsShipments < ActiveRecord::Migration
  def change
    create_table :ship_emails_shipments , id: false  do |t|
      t.belongs_to :shipment
      t.belongs_to :ship_email
    end
  end
end
