
class Region
    # hash regions Keys are the regions name and Values are an sorted array of countries
    REGIONS_HASH = {"North America" => ["Bahamas", "Belize", "Bermuda", "Canada", "Costa Rica", "Cuba", "Dominican Republic", "El Salvador", "Greenland", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama", "United States"],
                    "South America" =>["Antigua & Barbuda", "Argentina", "Barbados", "Brazil", "Chile", "Colombia", "Dominica", "Ecuador", "French Guiana", "Grenada", "Guadeloupe", "Guyana", "Martinique", "Peru", "St Kitts and Nevis", "St Lucia", "St Vincent and the Grenadines", "Suriname", "Trindad and Tobago", "Uruguay", "Venezuela"],
                    "Europe"        =>["Albania", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Finland", "France", "Georgia", "Germany", "Greece", "Iceland", "Ireland", "Israel", "Italy", "Lebanon", "Netherlands", "Norway", "Portugal", "Romania", "Russian Arctic", "Russian Black Sea", "Serbia & Montenegro", "Slovenia", "Spain", "Sweden", "Syria", "Turkey", "Ukraine", "United Kingdom"],
                    "Africa"        => ["Algeria", "Angola", "Benin", "Cameroon", "Congo", "Cote d'ivoire", "DR Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Liberia", "Libya", "Madagascar", "Mauritania", "Morocco", "Mozambique", "Namibia", "Nigeria", "Senegal", "Sierra Leone", "Somalia", "South Africa", "Sudan", "Tanzania", "Togo", "Tunisia", "Western Sahara"],
                    "Australia"     =>["Australia", "New Caledonia", "New Zealand", "Papua New Guinea"],
                    "India and South East Asia" =>["Bangladesh", "Brunei", "Cambodia", "India", "Indonesia", "Malaysia", "Myanmar", "Philippines", "Sri Lanka", "Thailand", "Timor-leste", "Vietnam"],
                    "Arabia and Persian Gulf"   => ["Bahrain", "Iran", "Iraq", "Jordan", "Kuwait", "Oman", "Pakistan", "Qatar", "Saudi Arabia", "UAE", "Yemen"],
                    "Far East" => ["China", "Japan", "North Korea", "Russian Pacific", "South Korea", "Taiwan"],
    }
    # this class replacing enum.
    class Region_names
        include Singleton

        def north_america
            NorthAmerica.to_s
        end
        def south_america
            SouthAmerica.to_s
        end
        def africa
            "Africa"
        end
        def persian_gulf
            "Arabia and Persian Gulf"
        end
        def australia
            "Australia"
        end
        def europe
            "Europe"
        end
        def india
            "India and South East Asia"
        end
        def far_east
            "Far East"
        end




    end
    # end Region_names class


    REGIONS = Region_names.instance

    def self.all

         # return an array of all the regions
        regions = ["North America","South America" , "Africa" ,"Arabia and Persian Gulf" ,
                   "Australia"  ,"Europe"  , "India and South East Asia","Far East"  ]
    end

    def self.all_with_coordinates

        # array that holds coordinates of the regions.
        lat_lng = [[48.2893, -99.3594], [-10.4893, -59.3594],[17.6493, 11.5994],
                   [33.1376, 47.6367], [-25.8000, 133.2422],[53.1289, 45.1102],
                   [24.4471,85.1660] ,[35.8178, 118.0371],[-4.0396, 121.2891]];
        # return a hash with all regions and its coordinates.
        regions_coordinates = {"North America" => lat_lng[0],"South America" => lat_lng[1] ,
                                "Africa" => lat_lng[2],"Persian Gulf" => lat_lng[3],
                                "Australia" => lat_lng[4],"Europe" => lat_lng[5],
                                "India" => lat_lng[6],"Mid to North China" => lat_lng[7],
                                "South East Asia" => lat_lng[8]}
    end


    def self.get_region country_name

        REGIONS_HASH.each_value do |v|
            v.bsearch { |x|
                if (country_name > x)
                    1 # go right
                elsif(country_name == x)
                    return  REGIONS_HASH.key(v)
                else
                    -1 # go left
                end
            }

        end
        return "'#{country_name}'  is not a country in the system"
    end

end


# class
class NorthAmerica < Region

    def self.countries
        countries =   ["Bahamas", "Belize", "Bermuda", "Canada", "Costa Rica", "Cuba", "Dominican Republic", "El Salvador", "Greenland", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama", "United States"]
    end

    def self.to_s
        "North America"
    end
end

class SouthAmerica < Region
    def self.countries

     countries =  ["Antigua & Barbuda", "Argentina", "Barbados", "Brazil", "Chile", "Colombia", "Dominica", "Ecuador", "French Guiana", "Grenada", "Guadeloupe", "Guyana", "Martinique", "Peru", "St Kitts and Nevis", "St Lucia", "St Vincent and the Grenadines", "Suriname", "Trindad and Tobago", "Uruguay", "Venezuela"]

    end

    def self.to_s
        "South America"
    end
end

class Europe < Region

    def self.countries
        countries = ["Albania", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Finland", "France", "Georgia", "Germany", "Greece", "Iceland", "Ireland", "Israel", "Italy", "Lebanon", "Netherlands", "Norway", "Portugal", "Romania", "Russian Arctic", "Russian Black Sea", "Serbia & Montenegro", "Slovenia", "Spain", "Sweden", "Syria", "Turkey", "Ukraine", "United Kingdom"]
    end
    def self.to_s
        "Europe"
    end
end

class Africa < Region

    def self.countries
        countries = ["Algeria", "Angola", "Benin", "Cameroon", "Congo", "Cote d'ivoire", "DR Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Liberia", "Libya", "Madagascar", "Mauritania", "Morocco", "Mozambique", "Namibia", "Nigeria", "Senegal", "Sierra Leone", "Somalia", "South Africa", "Sudan", "Tanzania", "Togo", "Tunisia", "Western Sahara"]

    end
    def self.to_s
        "Africa"
    end
end

class Australia < Region

    def self.countries
        countries = ["Australia", "New Caledonia", "New Zealand", "Papua New Guinea"]

    end
    def self.to_s
        "Australia"
    end
end

class India_and_SouthEastAsia < Region

    def self.countries
        countries = ["Bangladesh", "Brunei", "Cambodia", "India", "Indonesia", "Malaysia", "Myanmar", "Philippines", "Sri Lanka", "Thailand", "Timor-leste", "Vietnam"]

    end
    def self.to_s
        "India and South East Asia"
    end
end

class Arabia_and_PersianGulf < Region

    def self.countries
        countries = ["Bahrain", "Iran", "Iraq", "Jordan", "Kuwait", "Oman", "Pakistan", "Qatar", "Saudi Arabia", "UAE", "Yemen"]

    end
    def self.to_s
        "India and South East Asia"
    end
end

class FarEast < Region

    def self.countries
        countries = ["China", "Japan", "North Korea", "Russian Pacific", "South Korea", "Taiwan"]
    end
    def self.to_s
        "India and South East Asia"
    end
end