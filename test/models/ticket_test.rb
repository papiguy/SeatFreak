# == Schema Information
#
# Table name: tickets
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  event_id   :integer          not null
#  section    :integer          not null
#  row        :integer
#  seat       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  price      :integer          not null
#

require 'test_helper'

class TicketTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
