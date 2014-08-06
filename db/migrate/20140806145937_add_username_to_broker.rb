class AddUsernameToBroker < ActiveRecord::Migration
  def change
      add_column :brokers, :username, :string
      add_index :brokers, :username, unique: true
  end
end
