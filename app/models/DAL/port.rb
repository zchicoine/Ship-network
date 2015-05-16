
    class Port < ActiveRecord::Base
        before_save{
            self.region = region.downcase
            self.name = name.downcase
          # strip! Removes leading and trailing whitespace from str. Returns nil if str was not altered.
            # therefore strip will be used
            self.region = region.strip
        }

        validates_presence_of :name
        validates_presence_of :region
        validates_uniqueness_of :name, case_sensitive: false
        validates_numericality_of :latitude
        # validates_inclusion_of :latitude, in:-91..91
        validates_numericality_of :longitude
        # validates_inclusion_of :longitude, in:-181..181
        has_many :shipments
        has_many :ships, :through => :shipments, :dependent => :destroy
    end
