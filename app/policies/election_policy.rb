class ElectionPolicy < ApplicationPolicy
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
    [:date, :visible]
  end

  class Scope < ApplicationPolicy::Scope
    def resolve
      scoped = scope.all
      if !user.try(:admin?)
        scoped = scoped.where("visible = ?", true)
      end
      scoped
    end
  end
end
