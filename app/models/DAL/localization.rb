# this file is responsible for providing methods to access locales.json file in public/external file

class Localization
    include Singleton
    # read data from localization.json file

    class LocalizationDatabase
        include Singleton

        def get_type_0
            access_locales_file[0]
        end
        private
        def access_locales_file
            path = Rails.public_path.join('external_files/localization.json')
            json_file =   File.read(path)
            return JSON.parse(json_file)
        end
    end

    LOCALES_TYPE = LocalizationDatabase.instance.get_type_0

    def values
        # An OpenStruct is a data structure, similar to a Hash, that allows the definition of arbitrary attributes with their accompanying values
        OpenStruct.new(LOCALES_TYPE)
    end

end