module Api
  class ElectionsController < ApiController
    def index
      @elections = policy_scope(Election).order('date DESC')
      render json: ElectionSerializer.new(@elections)
    end

    def create
      @election = authorize Election.new(permitted_attributes(Election))
      if @election.save
        head :created
      else
        render json: ErrorSerializer.new(@election), status: :unprocessable_entity
      end
    end

    def show
      @election = authorize Election.find_by(id: params[:id])
      render json: ElectionSerializer.new(@election)
    end

    def update
      @election = authorize Election.find_by(id: params[:id])
      if @election.update_attributes(permitted_attributes(@election))
        head :no_content
      else
        render json: ErrorSerializer.new(@election), status: :unprocessable_entity
      end
    end
  end
end
