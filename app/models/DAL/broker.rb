class Broker < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


    #  customization
    # validation
  validates_presence_of :username
  # relationship
  has_and_belongs_to_many :shipments
end
