class ShipEmail < ActiveRecord::Base
    validates_presence_of :broker
    validates_presence_of :email_body
    validates_presence_of :email_date
    validates_presence_of :email_subject
    belongs_to :broker
    has_and_belongs_to_many :shipments
end