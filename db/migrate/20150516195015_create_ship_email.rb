class CreateShipEmail < ActiveRecord::Migration
  def change
    create_table :ship_emails do |t|
      # the reason why email information is here because
      #  each email can have multiple shipments,
      #  and each shipment can have multiple brokers
      t.string :email_body , null: false
      t.string :email_subject , null: false
      t.string :original_email_address # email address of the original sender
      t.date :email_date , null: false
      t.integer :broker_id
    end
    add_index :ship_emails, :broker_id
  end
end