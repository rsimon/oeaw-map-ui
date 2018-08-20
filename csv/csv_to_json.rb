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
    grouped.each do |key, val|
      val.each { |record| record.delete('person') }
    end
    @model = grouped
  end

  def write_to_file(filename)
    f = File.open(filename, 'w')
    f.write(JSON.pretty_generate(@model))
    f.close
  end

  '''
  Just for info, testing and future use
  '''
  def list_people
    @model.map { |name, places| name }
  end

  def list_places_for(person)
    @model[person]
  end
end

'''
Loads the raw CSV data, line by line, as a hash
'''
def load_csv()
  f = File.read(INPUT_CSV)
  CSV.parse(f, :headers => true, :col_sep => ";").map do |row|
    as_hash = row.to_hash
    as_hash['geom'] = JSON.parse(as_hash['polygon_point'])
    as_hash.delete('polygon_point')
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
