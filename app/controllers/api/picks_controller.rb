module Api
  class PicksController < ApiController
    before_action :load_election, only: [:index]
    before_action :load_measure, only: [:create]
    before_action :load_org, only: [:index, :create]
    before_action :load_pick, only: [:destroy]

    def index
      @picks = policy_scope(@election.picks.where(picks: {org: @org}))
      @measures = policy_scope(@election.measures.includes(:choices))
      @measures.each do |measure|
        measure.association(:picks).target = @picks.map{ |p| p.measure_id == measure.id ? p : nil }.compact
      end
      render json: MeasureSerializer.new(@measures, {params: {picks: true}})
    end

    def create
      @pick = authorize @measure.picks.build(permitted_attributes(Pick))
      @pick.org = @org
      if @pick.save
        render json: {
          id: @pick.id,
          choice_id: @pick.choice_id,
          metadata: @pick.metadata
        }, status: :created
      else
        render json: ErrorSerializer.new(@measure), status: :unprocessable_entity
      end
    end

    def destroy
      @pick.destroy
      head :no_content
    end

    def load_election
      @election = Election.find_by(id: params[:election_id])
      head :not_found if @election.nil?
    end

    def load_measure
      @measure = Measure.find_by(id: params[:measure_id])
      head :not_found if @measure.nil?
    end

    def load_org
      @org = Org.find_by(id: params[:org_id])
      head :not_found if @org.nil?
    end

    def load_pick
      @pick = authorize Pick.find_by(id: params[:id])
      head :not_found if @pick.nil?
    end
  end
end
