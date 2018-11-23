class PickPolicy < ApplicationPolicy
  def create?
    user.try(:admin?)
  end

  def show?
    true
  end

  def update?
    create?
  end

  def destroy?
    create?
  end

  def permitted_attributes
    [:choice_id, metadata: {}]
  end
end
