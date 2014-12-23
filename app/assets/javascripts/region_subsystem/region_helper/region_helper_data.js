/**
 *
 * @returns {region names from region_database.json}
 */
Region_Helper.regions_names = function()
{
    var _data = [];
    var counter = 0;
    Region_Helper.access_json_file().forEach(function (region)
        {
            _data[counter] = region["region"];
            counter++;
        })
    return _data;
}