
class Region
    include Singleton
    # read data from region_database.json file
    class RegionDatabase
        include Singleton

        def region_names
            _region_names = Hash.new
            read_region_database_overview.each do |element|
                _region_names.store( element['region'], element['region'] )
            end
            # return an array of all the regions
            return  _region_names
        end

        def region_alter1_names
            _region_alter_names = Hash.new
            # return an array of all the regions
            read_region_database_overview.each do |element|
                _region_alter_names..store( element['region'], element['alternativeNames1'])
            end

            return  _region_alter_names
        end
        def region_alter2_names
            _region_alter_names = Hash.new
            # return an array of all the regions
            read_region_database_overview.each do |element|
                _region_alter_names.store( element['region'], element['alternativeNames2'])
            end

            return  _region_alter_names
        end
        def region_coordinates
            _region_coordinates = Hash.new
            # return an array of all the regions
            read_region_database_overview.each do |element|
                _region_coordinates.store( element['region'], element['coordinates'])
            end

            return  _region_coordinates
        end

        private
        def read_region_database_overview
            path = Rails.public_path.join('external_files/regions_database.json')
            json_file =   File.read(path)
            return JSON.parse(json_file)['overview']
        end

    end
    # end of RegionDatabase


    # hash regions Keys are the regions name and Values are an sorted array of countries
    REGIONS_HASH = {"North America" => ["Bahamas", "Belize", "Bermuda", "Canada", "Costa Rica", "Cuba", "Dominican Republic", "El Salvador", "Greenland", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico", "Montserrat","Nicaragua", "Panama","Puerto Rico", "Saint Barthelemy","United States"],
                    "South America" =>["Antigua & Barbuda", "Argentina", "Barbados", "Bonaire, Sint Eustatius and Saba","Brazil","Chile", "Colombia", "Curacao", "Dominica", "Ecuador", "French Guiana", "Grenada", "Guadeloupe", "Guyana", "Martinique", "Peru", "Saint Lucia" ,"St Kitts and Nevis", "St Lucia", "St Vincent and the Grenadines", "Suriname", "Trinidad and Tobago" , "Uruguay", "Venezuela"],
                    "Europe"        =>["Albania", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark","Estonia","Faroe Islands", "Finland", "France", "Georgia", "Germany", "Gibraltar","Greece", "Iceland", "Ireland", "Israel", "Italy", "Latvia","Lebanon", "Lithuania","Malta","Montenegro","Netherlands", "Norway","Poland" ,"Portugal", "Romania", "Russia","Russian Arctic", "Russian Black Sea", "Serbia & Montenegro", "Slovenia", "Spain", "Sweden","Switzerland", "Syria", "The Netherlands","Turkey", "Ukraine", "United Kingdom"],
                    "Africa"        => ["Algeria", "Angola", "Benin", "Cameroon", "Congo", "Cote d'ivoire", "DR Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Liberia", "Libya", "Madagascar", "Mauritania","Mauritius", "Morocco", "Mozambique", "Namibia", "Nigeria", "Senegal", "Sierra Leone", "Somalia", "South Africa", "Sudan", "Tanzania", "Togo", "Tunisia", "Western Sahara"],
                    "Australia"     =>["Australia","Fiji", "French Polynesia" ,"Guam","New Caledonia", "New Zealand", "Papua New Guinea","Solomon Islands","Tonga", "Vanuatu"],
                    "India and South East Asia" =>["Bangladesh", "Brunei", "Cambodia", "Hong Kong","India", "Indonesia", "Malaysia", "Myanmar", "Philippines", "Republic of the Union of Myanmar","Sri Lanka", "Thailand", "Timor-leste", "Vietnam"],
                    "Arabia and Persian Gulf"   => ["Bahrain", "Iran", "Iraq", "Jordan", "Kuwait", "Oman", "Pakistan", "Qatar", "Saudi Arabia", "United Arab Emirates", "Yemen"],
                    "Far East" => ["China", "Japan", "North Korea", "Russian Pacific", "South Korea", "Taiwan"],
    }


    NAMES = RegionDatabase.instance.region_alter2_names #An instance variable

    # start of public functions

    def all
         # return an array of all the regions
        return  NAMES
    end

    def all_with_coordinates

        # array that holds coordinates of the regions.
        lat_lng = RegionDatabase.instance.region_coordinates.values
        _names = NAMES.to_a
        # return a hash with all regions and its coordinates.
        return  {Hash[*_names[0]] => lat_lng[0],Hash[*_names[1]] => lat_lng[1] ,
                 Hash[*_names[2]] => lat_lng[2],Hash[*_names[3]] => lat_lng[3],
                 Hash[*_names[4]]=> lat_lng[4],Hash[*_names[5]] => lat_lng[5],
                 Hash[*_names[6]]=> lat_lng[6],Hash[*_names[7]]=> lat_lng[7]}
    end


    def get_region(country_name)

        REGIONS_HASH.each_value do |v|
            v.bsearch { |x|
                if (country_name > x)
                    1 # go right
                elsif (country_name == x)
                    return REGIONS_HASH.key(v)
                else
                    -1 # go left
                end
            }

        end
        return "'#{country_name}'  is not a country in the system"
    end
    # end of public functions

end


# class
class NorthAmerica < Region

    def self.countries
        countries =   ["Bahamas", "Belize", "Bermuda", "Canada", "Costa Rica", "Cuba", "Dominican Republic", "El Salvador", "Greenland", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama", "United States"]
    end

    def self.to_s
        RegionDatabase::region_names[0]
    end

end

class SouthAmerica < Region
    def self.countries

     countries =  ["Antigua & Barbuda", "Argentina", "Barbados", "Brazil", "Chile", "Colombia", "Dominica", "Ecuador", "French Guiana", "Grenada", "Guadeloupe", "Guyana", "Martinique", "Peru", "St Kitts and Nevis", "St Lucia", "St Vincent and the Grenadines", "Suriname", "Trindad and Tobago", "Uruguay", "Venezuela"]

    end

    def self.to_s
        RegionDatabase::region_names[1]
    end
end


class Africa < Region

    def self.countries
        countries = ["Algeria", "Angola", "Benin", "Cameroon", "Congo", "Cote d'ivoire", "DR Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Liberia", "Libya", "Madagascar", "Mauritania", "Morocco", "Mozambique", "Namibia", "Nigeria", "Senegal", "Sierra Leone", "Somalia", "South Africa", "Sudan", "Tanzania", "Togo", "Tunisia", "Western Sahara"]

    end
    def self.to_s
        RegionDatabase::region_names[2]
    end
end
class Europe < Region

    def self.countries
        countries = ["Albania", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Finland", "France", "Georgia", "Germany", "Greece", "Iceland", "Ireland", "Israel", "Italy", "Lebanon", "Netherlands", "Norway", "Portugal", "Romania", "Russian Arctic", "Russian Black Sea", "Serbia & Montenegro", "Slovenia", "Spain", "Sweden", "Syria", "Turkey", "Ukraine", "United Kingdom"]
    end
    def self.to_s
        RegionDatabase::region_names[3]
    end
end

class ArabiaAndPG < Region

    def self.countries
        countries = ["Bahrain", "Iran", "Iraq", "Jordan", "Kuwait", "Oman", "Pakistan", "Qatar", "Saudi Arabia", "UAE", "Yemen"]

    end
    def self.to_s
        RegionDatabase::region_names[4]
    end
end


class IndiaAndSEA < Region

    def self.countries
        countries = ["Bangladesh", "Brunei", "Cambodia", "India", "Indonesia", "Malaysia", "Myanmar", "Philippines", "Sri Lanka", "Thailand", "Timor-leste", "Vietnam"]

    end
    def self.to_s
        RegionDatabase::region_names[5]
    end
end
class Australia < Region

    def self.countries
        countries = ["Australia", "New Caledonia", "New Zealand", "Papua New Guinea"]

    end
    def self.to_s
        RegionDatabase::region_names[6]
    end
end


class FarEast < Region

    def self.countries
        countries = ["China", "Japan", "North Korea", "Russian Pacific", "South Korea", "Taiwan"]
    end
    def self.to_s
        RegionDatabase::region_names[7]
    end
end