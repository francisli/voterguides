module Api
  class ApiController < ApplicationController
    include Pundit

    after_action :verify_authorized, except: :index
    after_action :verify_policy_scoped, only: :index
    rescue_from Pundit::NotAuthorizedError, with: :deny_access

    skip_before_action :verify_authenticity_token

    respond_to :json

    private

    def deny_access
      head :unauthorized
    end
  end
end
