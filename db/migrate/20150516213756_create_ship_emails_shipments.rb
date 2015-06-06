class CreateShipEmailsShipments < ActiveRecord::Migration
  def change
    create_table :ship_emails_shipments , id: false  do |t|
      t.belongs_to :shipment
      t.belongs_to :ship_email
    end
    add_index 'ship_emails_shipments', %w(shipment_id ship_email_id), :unique => true
  end
end
