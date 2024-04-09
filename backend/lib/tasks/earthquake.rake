private  
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

namespace :earthquake do
  task earthquakes_data_service: :environment do
    BASE_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
    response = Faraday.get(BASE_URL)

    if response.success?
      features = JSON.parse(response.body)['features']
      features.each do |feature_data|
        Feature.create(process_feature_data(feature_data))
      end
    else
      puts "Error fetching data from USGS API"
    end
  end
end


