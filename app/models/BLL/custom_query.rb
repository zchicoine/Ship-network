module CustomQuery

    def query_at_a_region(region)
        region = region.downcase
        region = region.strip
        where(region: region)
    end

    # pass arguments to select function
    # [:key1,:key2]
    def query_select_parameters(array_params = [])

        unless array_params.blank?

            return select(array_params)
        else

            return select("*")
        end

    end

    def execute_query(limit = -1)
        if limit == -1
            all
        else
            take(limit)[0]
        end
    end

end