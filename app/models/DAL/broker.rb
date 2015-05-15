class Broker < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable , :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


    #  customization
    # validation
  validates_presence_of :username
  # relationship
  has_one :brokers_shipments
  has_many :shipments, :through => :brokers_shipments, :dependent => :destroy

end
