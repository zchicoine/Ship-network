module LocalizationHelper

    def locales
        Localization.instance.values
    end

end