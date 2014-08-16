class AddCompanyNameToBroker < ActiveRecord::Migration
  def change
      add_column :brokers, :company, :string
  end
end
