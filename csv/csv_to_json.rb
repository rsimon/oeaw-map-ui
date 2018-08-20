require 'csv'
require 'json'

INPUT_CSV   = 'dump_20180817.csv'
OUTPUT_JSON = '../public/data/data.json'

'''
Super-simple domain model class
'''
class Model
  def initialize(data)
    grouped = data.group_by { |record| record['person'] }
    as_array = grouped.map do |key, val|
      { 'person' => key, 'places' => val }
    end
    @model = as_array
  end

  def write_to_file(filename)
    f = File.open(filename, 'w')
    f.write(JSON.pretty_generate(@model))
    f.close
  end
end

'''
Loads the raw CSV data, line by line, as a hash
'''
def load_csv()
  f = File.read(INPUT_CSV)
  CSV.parse(f, :headers => true, :col_sep => ";").map do |row|
    as_hash = row.to_hash

    geom = JSON.parse(as_hash['polygon_point'])
    as_hash.delete('polygon_point')
    geom['coordinates'] = geom['coordinates']

    as_hash['geom'] = geom
    as_hash
  end
end

'''
Builds the person/place domain model from the CSV data
'''
def build_model(csv)
  csv
end

model = Model.new(load_csv)
model.write_to_file(OUTPUT_JSON)
