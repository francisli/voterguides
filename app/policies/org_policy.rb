class OrgPolicy < ApplicationPolicy
  def create?
    user.try(:admin?)
  end

  def show?
    true
  end

  def update?
    create?
  end

  def permitted_attributes
    [:name, metadata: {}]
  end
end
