module SideBarHelper
    # array that holds coordinates of the regions.

    lat_lng = [[48.2893, -99.3594], [-10.4893, -59.3594],[17.6493, 11.5994],
                    [33.1376, 47.6367], [-25.8000, 133.2422],[53.1289, 45.1102],
                    [24.4471,85.1660] ,[35.8178, 118.0371],[-4.0396, 121.2891]];

    @regions = {"North America" => lat_lng[1],"South America" => lat_lng[2] ,
                "Africa" => lat_lng[3],"Persian Gulf" => lat_lng[4],
                "Australia" => lat_lng[5],"Europe" => lat_lng[6],
                "India" => lat_lng[7],"Mid to North China" => lat_lng[8],
                "South East Asia" => lat_lng[9]}



end