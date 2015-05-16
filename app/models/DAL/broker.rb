class Broker < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable , :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


    #  customization
    # validation
  validates_presence_of :username
  # relationship
  has_and_belongs_to_many :shipments
  has_many :ship_emails
end
