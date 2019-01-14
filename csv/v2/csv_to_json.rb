require 'csv'
require 'json'

INPUT_CSV   = 'dump_orthodox_2019-01-11.csv'
OUTPUT_JSON = '../../public/data/data.json'

###
# Super-simple "domain model" class. Doesn't really do anything. But perhaps
# useful for future use.
###
class Model
  def initialize(data)
    grouped = data.group_by { |record| record['id'] }
    as_array = grouped.map do |key, val|
      { 'id' => key, 'places' => val }
    end
    @model = as_array
  end

  def write_to_file(filename)
    f = File.open(filename, 'w')
    f.write(JSON.pretty_generate(@model))
    f.close
  end
end

###
# Loads the raw CSV data, line by line, as a hash.
###
def load_csv()
  f = File.read(INPUT_CSV)
  CSV.parse(f, :headers => true, :col_sep => ",").map do |row|
    as_hash = row.to_hash

    geom = { 
      type: "Point",
      coordinates: as_hash['coordinates'].split.map { |num| num.to_f }
    }

    as_hash.delete('coordinates')
    as_hash['geom'] = geom
    as_hash
  end
end

# Load CSV, build model, and write to file
model = Model.new(load_csv)
model.write_to_file(OUTPUT_JSON)
