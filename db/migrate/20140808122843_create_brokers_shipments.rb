class CreateBrokersShipments < ActiveRecord::Migration
  def change
    create_table :brokers_shipments , id: false do |t|
        t.belongs_to :shipment
        t.belongs_to :broker
        # the reason why email information is here because each shipment can have multiple brokers
        t.string :email_body , null: false
        t.string :email_subject , null: false
        t.string :original_email_address # email address of the original sender
        t.date :email_date , null: false
    end
  end
end
