class AddStatusToInvoices < ActiveRecord::Migration[7.0]
  def change
    add_column :invoices, :status, :integer
  end
end
