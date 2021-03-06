module Api
  class OrgsController < ApiController
    before_action :load_org, only: [:show, :update]

    def index
      if params[:election_id]
        @election = Election.find_by(id: params[:election_id])
        head :not_found and return if @election.nil?
        @orgs = policy_scope(@election.orgs.order(:name))
      else
        @orgs = policy_scope(Org.order(:name))
      end
      render json: OrgSerializer.new(@orgs)
    end

    def create
      @org = authorize Org.new(permitted_attributes(Org))
      if @org.save
        head :created
      else
        render json: ErrorSerializer.new(@org), status: :unprocessable_entity
      end
    end

    def show
      render json: OrgSerializer.new(@org)
    end

    def update
      if @org.update_attributes(permitted_attributes(@org))
        head :no_content
      else
        render json: ErrorSerializer.new(@org), status: :unprocessable_entity
      end
    end

    def load_org
      @org = authorize Org.find_by(id: params[:id])
    end
  end
end
