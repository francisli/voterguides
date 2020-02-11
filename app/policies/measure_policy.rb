class MeasurePolicy < ApplicationPolicy
  def create?
    user.try(:admin?)
  end

  def show?
    true
  end

  def update?
    create?
  end

  def up?
    create?
  end

  def down?
    create?
  end

  def permitted_attributes
    [:title, :position, metadata: {}, choices_attributes: [:id, :title, :position, :_destroy, metadata: {}]]
  end
end
