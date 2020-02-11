module Api
  class MeasuresController < ApiController
    before_action :load_election, except: [:show, :update, :up, :down]

    def index
      @measures = policy_scope(@election.measures).includes(:choices)
      render json: MeasureSerializer.new(@measures)
    end

    def create
      @measure = authorize @election.measures.build(permitted_attributes(Measure))
      if @measure.save
        head :created
      else
        render json: ErrorSerializer.new(@measure), status: :unprocessable_entity
      end
    end

    def show
      @measure = authorize Measure.find_by(id: params[:id])
      render json: MeasureSerializer.new(@measure)
    end

    def update
      @measure = authorize Measure.find_by(id: params[:id])
      if @measure.update_attributes(permitted_attributes(@measure))
        head :no_content
      else
        render json: ErrorSerializer.new(@measure), status: :unprocessable_entity
      end
    end

    def up
      @measure = authorize Measure.find_by(id: params[:measure_id])
      @measure.move_higher
      head :no_content
    end

    def down
      @measure = authorize Measure.find_by(id: params[:measure_id])
      @measure.move_lower
      head :no_content
    end

    def load_election
      @election = Election.find_by(id: params[:election_id])
      head :not_found if @election.nil?
    end
  end
end
