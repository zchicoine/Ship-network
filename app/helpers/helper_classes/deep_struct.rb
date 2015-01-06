# deep_struct.rb
# the following code is taken from: http://andreapavoni.com/blog/2013/4/create-recursive-openstruct-from-a-ruby-hash/#.VKXmrGTF9QY
class DeepStruct < OpenStruct
    def initialize(hash=nil)
        @table = {}
        @hash_table = {}

        if hash
            hash.each do |k,v|
                @table[k.to_sym] = (v.is_a?(Hash) ? self.class.new(v) : v)
                @hash_table[k.to_sym] = v

                new_ostruct_member(k)
            end
        end
    end
    def to_h
        @hash_table
    end
end