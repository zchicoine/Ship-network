module AdminHelpers
    module ShipsHelperC

        # :description update or create a ship
        # :param [Json]
        # :return [Hash] {data: , error:}
        def update_and_create_ships(object)
            temp_hash = {}
            temp_hash[:data] = []
            temp_hash[:error] =[]
            object.each do |ship|
                begin
                    @name = ship['motorVessel']
                    deadweight = ship['deadweight']
                    deadweight_cargo_capacity =  ship['deadweightCargoCapacity']
                    vessel_type = ship['typeOfVessel']

                    deadweight = deadweight.to_i
                    deadweight_cargo_capacity = deadweight_cargo_capacity.to_i

                    vessel_type_to_i = convert_vessel_type(vessel_type)

                    if deadweight == 0
                        category_name = convert_category_name(deadweight_cargo_capacity)
                    else
                        category_name = convert_category_name(deadweight)
                    end

                    draft = ship['draft'].to_f
                    built = ship['yearBuilt'].to_i

                    ship = {vessel_type: vessel_type_to_i,
                            deadweight: deadweight.to_i,
                            deadweight_cargo_capacity: deadweight_cargo_capacity.to_i,
                            vessel_category: category_name.to_i,
                            ship_detail_attributes: {draft: draft,
                                                     built: built,
                                                     tons_per_centimeter: ship['tpc'].to_f,
                                                     flag: ship['flag'],
                                                     classification_society: ship['classificationSociety'],
                                                     length_over_all: ship['loa'].to_f,
                                                     beam: ship['beam'].to_f,
                                                     holds: ship['holds'].to_i,
                                                     hatches: ship['hatches'].to_i,
                                                     gross_registered_tonnage: ship['grt'],
                                                     net_registered_tonnage: ship['nrt'],
                                                     total_cubic_meters_GR: ship['totalCbmGrain'],
                                                     total_cubic_meters_BL: ship['totalCbmBale'],
                                                     total_cubic_feet_GR: ship['totalCbftGrain'],
                                                     total_cubic_feet_BL: ship['totalCbftBale'],
                                                     intermediate_fuel_oil_180?: return_boolean(ship['ifo180']),
                                                     intermediate_fuel_oil_380?: return_boolean(ship['ifo380']),
                                                     marine_diesel_oil?: return_boolean(ship['mdo']),
                                                     laden: ship['ladenSpeed'],
                                                     ballast: ship['ballastSpeed'],
                                                     economic: ship['ecoSpeed'],
                                                     consumption_at_sea_L: ship['consumptionL'],
                                                     consumption_at_sea_B: ship['consumptionB'],
                                                     eco_consumption_L: ship['consupmtionEcoL'],
                                                     marine_diesel_oil_at_sea: ship['mdoAtSea'],
                                                     marine_gasoline_oil_at_sea: ship['mgoAtSea'],
                                                     consumption_in_port_Working: ship['inPortWorking'],
                                                     consumption_in_port_Idle: ship['inPortIdle'],
                                                     marine_diesel_in_port: ship['mdoInPort'],
                                                     marine_gasoline_oil_in_port: ship['mgoInPort'],
                                                     number_of_cranes: ship['cranes'],
                                                     crane_capacity: ship['craneCapacity'],
                                                     combined_crane_capacity: ship['combinedCraneCapacity'],
                                                     aussie_holds_ladders?: return_boolean(ship['aussieHoldsLadders']),
                                                     CO2_system_on_board?: return_boolean(ship['co2Fitted']),
                                                     twenty_foot_equivalent_unit?: return_boolean(ship['twentyfootEquivalentUnits']),
                                                     lakes_fitted?: return_boolean(ship['lakesFitted']),
                                                     log_fitted?: return_boolean(ship['logFitted']),
                                                     grabber?: return_boolean(ship['grabs']),
                                                     gearless?: return_boolean(ship['gearless']),
                                                     double_hull?: return_boolean(ship['doubleHull']),
                                                     imo_fitted?: return_boolean(ship['imoFitted']),
                                                     appendix_B_fitted?: return_boolean(ship['appendixBFitted']),
                                                     box_shaped_holds?: return_boolean(ship['boxShapedHolds']),
                                                     cement_holes_fitted?: return_boolean(ship['cementHolesFitted']),
                                                     marine_gasoline_oil?: return_boolean(ship['mgo']),
                                                     ice_classed?: return_boolean(ship['iceClassed'])
                            }
                    }

                    vessel = UnitOfWork.instance.ship.get_by_name(@name.to_s)
                    if vessel[:error].nil?
                        vessel[:value].update!(ship)
                    else
                        # add the name of the ship once created
                        ship[:name] =  @name.to_s
                        Ship.create!(ship)

                    end

                rescue => e
                    temp_hash[:error].push(e.message + ' for vessel: ' + @name.to_s)
                end
            end
            return temp_hash
        end




        ### ============================================ private ================================================
        private

        def return_boolean(attribute)
            unless attribute.blank?
                if attribute.to_s == "yes"
                    return true
                else
                    return false
                end
            end
        end

        # :param [String]
        # :return [Int]
        def convert_vessel_type(vessel_type)
            temp = 0
            case vessel_type

                when 'SDBC'
                    temp = 1
                when 'OHBS'
                    temp = 2
                when 'MPP'
                    temp = 3
                when 'TWEEN'
                    temp = 4
                when 'RORO'
                    temp = 5
            end
            temp
        end

        # :param [String]
        # :return [Int]
        def convert_category_name(dwt)
            case dwt
                when 100000..10000000000
                    category_name = 7
                when 80000..100000
                    category_name = 6
                when 65000..80000
                    category_name = 5
                when 50000..65000
                    category_name = 4
                when 38000..50000
                    category_name = 3
                when 18000..38000
                    category_name = 2
                when 1..18000
                    category_name = 1
            end
            category_name
        end
    end
end