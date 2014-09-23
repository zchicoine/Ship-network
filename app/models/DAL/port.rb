
    class Port < ActiveRecord::Base
        before_save{
            self.region = region.downcase
            self.region = region.strip!
            #self.name = name.capitalize
            #self.name = name.strip!
        }

      validates_presence_of :name
      validates_presence_of :region
      validates_uniqueness_of :name, case_sensitive: false
      validates_numericality_of :latitude
      validates_inclusion_of :latitude, in:-90..90
      validates_numericality_of :longitude
      validates_inclusion_of :longitude, in:-180..180
      has_many :shipments
      has_many :ships, :through => :shipments, :dependent => :destroy
    end
