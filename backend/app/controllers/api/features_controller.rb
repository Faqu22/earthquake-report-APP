
class Api::FeaturesController < ApplicationController
  VALID_MAG_TYPES = %w[md ml ms mw me mi mb mlg].freeze



  # GET /features
  def index
    @features = Feature.all
    filter_by_mag_type
    paginate_features
    render json: format_features(@features)
  end
  
  def create
    @feature = Feature.new(feature_params)

    if @feature.save
      render json: @feature, status: :created
    else
      render json: @feature.errors, status: :unprocessable_entity
    end
  end
  
  def show
    render json: @feature
  end

  def update
    if @feature.update(feature_params)
      render json: @feature
    else
      render json: @feature.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @feature.destroy!
  end

  def process_feature_data(feature_data)
    properties = feature_data['properties']
    {
      external_id: feature_data['id'],
      mag: properties['mag'],
      place: properties['place'],
      time: properties['time'],
      url: properties['url'],
      tsunami: properties['tsunami'],
      magType: properties['magType'],
      title: properties['title'],
      longitude: feature_data['geometry']['coordinates'][0],
      latitude: feature_data['geometry']['coordinates'][1]
    }
  end

  def paginate_features
    page = params[:page] || 1
    per_page = params[:per_page] ? [params[:per_page].to_i, 1000].min : 30

    @features = @features.paginate(page: page, per_page: per_page)
  end
  
  def format_features(features)
    {
      data: features.map { |features| format_feature(features) },
      pagination: {
          current_page: @features.current_page,
          total: @features.total_pages,
          per_page: @features.limit_value
        }
    }
  end
  
  private
  def filter_by_mag_type
    if params[:mag_type]
      @features = @features.where(magType: params[:mag_type])
    end
  end
  
  def format_feature(feature)
    {
      id: feature.id,
      type: "feature",
      attributes: {
        external_id: feature.external_id,  # Assuming you want to use Feature ID 
        magnitude: feature.mag,
        place: feature.place,
        time: feature.time.to_s,  # Convert time to string 
        tsunami: feature.tsunami == 1,  # Convert to boolean
        mag_type: feature.magType,
        title: feature.title,
        coordinates: {
          longitude: feature.longitude,
          latitude: feature.latitude
        }
      },
      links: {
        external_url: feature.url
      }
    }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_feature
      @feature = Feature.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def feature_params
      params.require(:feature).permit(:mag, :place, :time, :url, :tsunami, :magType, :title, :longitude, :latitude, :external_id)
    end
end
