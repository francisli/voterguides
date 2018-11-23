class ApplicationController < ActionController::Base
  protected

  def authenticate_admin!
    authenticate_user!
    if current_user && !current_user.admin?
      flash[:alert] = t("application.not_allowed")
      redirect_to root_path
    end
  end
end
