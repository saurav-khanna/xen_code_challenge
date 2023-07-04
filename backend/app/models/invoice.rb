class Invoice < ApplicationRecord
  validates :invoice_number, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :due_date, presence: true
  enum status: [:created, :approved, :rejected, :purchased, :closed]
end
