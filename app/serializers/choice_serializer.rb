class ChoiceSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :metadata, :position, :updated_at, :created_at
end
