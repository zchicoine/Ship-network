module AdminHelperC

  def hash_the_json_file object
    hash_json_object = JSON.parse(object)
    return hash_json_object
  end

  # :param [File]
  # :return {data: ,error:}
  def read_uploaded_file(object)
      temp_hash = {}
    if object.blank?
        temp_hash[:error] = 'No file to read'
    else
        temp_hash[:data]= object.read.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
    end
      temp_hash
  end

  # :description  Convert a json object to ruby hash
  # :param [Json]
  # :return [Hash]
  def convert_it_to_hash_format(object)
    JSON.parse(object)
  end

  def require_admin_authentication
    unless current_broker.try(:admin?)
      redirect_to root_path                    #if a broker tries to view an admin_helpers page/action, they will be redirected to the main page.
    end
  end

end