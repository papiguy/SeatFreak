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
#  on_sale    :boolean          default(FALSE)
#

class Ticket < ApplicationRecord
  validates :user_id, :event_id, :section, :price, presence: true
  validates :on_sale, inclusion: { in: [true, false] }

  belongs_to :user

  belongs_to :event

end
