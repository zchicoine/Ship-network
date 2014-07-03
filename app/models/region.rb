class Region

    def self.all

         # return an array of all the regions
        regions = ["North America","South America" , "Africa" ,"Persian Gulf" ,
                   "Australia"  ,"Europe"  , "India","Mid to North China" , "South East Asia" ]
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




end