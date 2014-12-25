/**
 *
 * @returns {region names from region_database.json}
 */
Region_Helper.regions_names = function()
{
    var _data = [];
    var counter = 0;
    Region_Helper.access_json_file()['overview'].forEach(function (region)
        {

            if(region["region"] != undefined) {
                _data[counter] = region["region"];
                counter++;
            }
        });
    return _data;
}
/**
 *
 * @returns {region alternative1 names from region_database.json}
 */
Region_Helper.regions_alter1_names = function()
{
    var _data = [];
    var counter = 0;
    Region_Helper.access_json_file()['overview'].forEach(function (region)
    {

        if(region["alternativeNames1"] != undefined) {
            _data[counter] = region["alternativeNames1"];
            counter++;
        }
    });
    return _data;
}
/**
 *
 * @returns {North America area names from region_database.json}
 */
Region_Helper.north_america_area_names = function()
{
    var _data = [];
    var counter = 0;
    Region_Helper.access_json_file()['regionArea'].forEach(function (region)
    {
        if(region["naAreaName"] != undefined) {
            _data[counter] = region["naAreaName"];
            counter++;
        }
    });
    return _data;
}
/**
 *
 * @returns {South India_and_South_East_Asia area names from region_database.json}
 */
Region_Helper.indiaAndSEA_area_names = function()
{
    var _data = [];
    var counter = 0;
    Region_Helper.access_json_file()['regionArea'].forEach(function (region)
    {
        if(region["iSeaAreaName"] != undefined) {
            _data[counter] = region["iSeaAreaName"];
            counter++;
        }
    });
    return _data;
}
/**
 *
 * @returns {South India_and_South_East_Asia area Coordinates from region_database.json}
 */
Region_Helper.indiaAndSEA_area_coord = function()
{
    var _data = [];
    var counter = 0;
    Region_Helper.access_json_file()['regionArea'].forEach(function (region)
    {
        if(region["iSeaAreaCoord"] != undefined) {
            _data[counter] = region["iSeaAreaCoord"].split(','); // to convert the string (e.g. "111.2,222.1") to array of float number.
            counter++;
        }
    });
    return _data;
}
/**
 *
 * @returns {Australia area names from region_database.json}
 */
Region_Helper.australia_area_names = function()
{
    var _data = [];
    var counter = 0;
    Region_Helper.access_json_file()['regionArea'].forEach(function (region)
    {
        if(region["australiaAreaName"] != undefined) {
            _data[counter] = region["australiaAreaName"];
            counter++;
        }
    });
    return _data;
}
/**
 *
 * @returns {Australia area Coordinates from region_database.json}
 */
Region_Helper.australia_area_coord = function()
{
    var _data = [];
    var counter = 0;
    Region_Helper.access_json_file()['regionArea'].forEach(function (region)
    {
        if(region["australiaAreaCoord"] != undefined) {
            _data[counter] = region["australiaAreaCoord"].split(','); // to convert the string (e.g. "111.2,222.1") to array of float number.
            counter++;
        }
    });
    return _data;
}