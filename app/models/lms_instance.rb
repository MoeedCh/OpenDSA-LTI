class LmsInstance < ActiveRecord::Base
  #~ Relationships ............................................................
  has_many  :lms_accesses, inverse_of: :lms_instances
  has_many  :course_offerings, inverse_of: :lms_instance
  belongs_to  :lms_type, inverse_of: :lms_instances
  belongs_to :organization
  # has_many :users, :through => :lms_accesses

  #~ Validation ...............................................................

  validates_presence_of :url

  def self.get_oauth_creds(key)
    lms_instance = LmsInstance.where(consumer_key: key).first
    if LmsInstance.blank?
      return nil
    end
    consumer_key = lms_instance.consumer_key
    consumer_secret = lms_instance.consumer_secret
    {consumer_key => consumer_secret}
  end


  def display_name
    "#{url}"
  end


  #~ Private instance methods .................................................
end