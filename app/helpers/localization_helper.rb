module LocalizationHelper

    def locales
        Localization.instance.values
    end

    # return sentence with capitalize every word
    def locales_CEW
        Localization.instance.capitalize_every_word
    end

end