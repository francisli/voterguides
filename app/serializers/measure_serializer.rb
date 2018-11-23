class MeasureSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :metadata, :position, :updated_at, :created_at
  attribute :choices_attributes do |obj|
    obj.choices.map do |c|
      {
        id: c.id,
        title: c.title,
        metadata: c.metadata
      }
    end
  end
  attribute :picks_attributes, if: Proc.new { |record, params| params && params[:picks] } do |obj|
    obj.picks.map do |p|
      {
        id: p.id,
        choice_id: p.choice_id,
        metadata: p.metadata
      }
    end
  end
end
