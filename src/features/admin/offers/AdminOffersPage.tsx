import { createOffer } from "../../../services/admin.offers.service"

export const AdminOffersPage = () => {
  const addOffer = async () => {
    await createOffer({
      title: "Discount",
      discount_percentage: 20,
      is_global: true,
    })
  }

  return <button onClick={addOffer}>Add Offer</button>
}