class ErrorSerializer
  def initialize(model)
    @model = model
  end

  def to_hash
    puts @model.errors.inspect
    errors = @model.errors.messages.map do |field, errors|
      errors.map do |error_message|
        {
          source: {pointer: "/data/attributes/#{field}"},
          detail: error_message
        }
      end
    end
    @model.class.reflect_on_all_associations(:has_many).each do |relationship|
      @model.send(relationship.name).each_with_index do |child, index|
        errors << child.errors.messages.map do |field, errors|
          errors.map do |error_message|
            {
              source: {pointer: "/data/attributes/#{child.model_name.plural}[#{index}].#{field}"},
              detail: error_message
            }
          end
        end
      end
    end
    errors.flatten
  end
end
