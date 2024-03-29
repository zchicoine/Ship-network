class DeviseCreateBroker < ActiveRecord::Migration
    def change
        create_table(:brokers) do |t|
            ## Database authenticatable
            t.string :email,              null: false, default: ""
            t.string :username
            t.string :encrypted_password, null: false, default: ""
            t.boolean :admin, null: true, default: false
            # broker info
            t.string :company
            t.string :website
            t.string :telephone
            t.string :country
            t.string :city
            # broker status
            t.integer :num_ship_emails, default:0
            t.integer :num_personal_emails, default:0
            t.integer :num_order_emails, default:0
            t.integer :num_not_ship_emails, default:0
            ## Recoverable
            t.string   :reset_password_token
            t.datetime :reset_password_sent_at

            ## Rememberable
            t.datetime :remember_created_at

            ## Trackable
            # t.integer  :sign_in_count, default: 0, null: false
            # t.datetime :current_sign_in_at
            # t.datetime :last_sign_in_at
            # t.string   :current_sign_in_ip
            # t.string   :last_sign_in_ip

            ## Confirmable
            # t.string   :confirmation_token
            # t.datetime :confirmed_at
            # t.datetime :confirmation_sent_at
            # t.string   :unconfirmed_email # Only if using reconfirmable

            ## Lockable
            # t.integer  :failed_attempts, default: 0, null: false # Only if lock strategy is :failed_attempts
            # t.string   :unlock_token # Only if unlock strategy is :email or :both
            # t.datetime :locked_at


            t.timestamps
        end

        add_index :brokers, :email,                unique: true
        add_index :brokers, :reset_password_token, unique: true
        add_index :brokers, :username, unique: true
        # add_index :brokers, :confirmation_token,   unique: true
        # add_index :brokers, :unlock_token,         unique: true
    end
end
