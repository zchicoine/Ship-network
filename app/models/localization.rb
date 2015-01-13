# this file is responsible for providing methods to access locales.json file in public/external file

class Localization
    include Singleton
    # read data from localization.json file

    class LocalizationDatabase
        include Singleton
        # Capitalize Every Word
        def get_type_0
            access_locales_file[0]
        end
        def get_types
            {
                capitalize_every_word: access_locales_file[0],
                capitalize_first_word: access_locales_file[1]
            }
        end
        private
        def access_locales_file
            path = Rails.public_path.join('external_files/localization.json')
            json_file =   File.read(path)
            return JSON.parse(json_file)
        end
    end

    LOCALES_TYPE = LocalizationDatabase.instance.get_types

    def values
        # An OpenStruct is a data structure, similar to a Hash, that allows the definition of arbitrary attributes with their accompanying values
        DeepStruct.new(LOCALES_TYPE)
    end
    def capitalize_every_word
        # An OpenStruct is a data structure, similar to a Hash, that allows the definition of arbitrary attributes with their accompanying values
        DeepStruct.new(LocalizationDatabase.instance.get_type_0)
    end

end