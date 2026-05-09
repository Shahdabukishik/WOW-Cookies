import { useCallback, useMemo, useState } from "react"
import { getCurrentUser } from "@/services/auth.service"
import { computeTotalPrice, type CartItemView } from "@/services/cart.service"
import {
  submitOrder,
  type FulfillmentMethod,
  type SubmitOrderPayload,
} from "@/services/order.service"

export type CheckoutFormValues = {
  firstName: string
  lastName: string
  phone: string | null
  address: string
  fulfillmentMethod: FulfillmentMethod
}

const initialFormValues: CheckoutFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  fulfillmentMethod: "delivery",
}

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Could not submit the order"

export const useCheckout = (
  selectedItems: CartItemView[],

  options: { onSuccess?: () => Promise<void> | void } = {}
) => {
  const { onSuccess } = options
  const [formValues, setFormValues] = useState<CheckoutFormValues>(initialFormValues)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const totalPrice = useMemo(() => computeTotalPrice(selectedItems), [selectedItems])
  const totalPriceLabel = `${totalPrice.toFixed(2)} ₪`

  const updateField = useCallback(
    <Key extends keyof CheckoutFormValues>(field: Key, value: CheckoutFormValues[Key]) => {
      setFormValues((current) => ({ ...current, [field]: value }))
    },
    []
  )

  const canSubmit = useMemo(
    () =>
      selectedItems.length > 0 &&
      formValues.firstName.trim().length > 0 &&
      formValues.lastName.trim().length > 0 &&
      (formValues.phone?.trim().length ?? 0) > 0 &&
      (formValues.fulfillmentMethod === "pickup" || formValues.address.trim().length > 0),
    [formValues, selectedItems.length]
  )

  const buildPayload = useCallback(
    (userId: string): SubmitOrderPayload => ({
      userId,
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
      phone: formValues.phone?.trim() ?? "",
      address:
        formValues.fulfillmentMethod === "pickup"
          ? ""   
          : formValues.address.trim(),
      fulfillmentMethod: formValues.fulfillmentMethod,
      items: selectedItems,
      totalPrice,
    }),
    [formValues, selectedItems, totalPrice]
  )

  const confirmOrder = useCallback(async () => {
    if (!canSubmit) {
      setError("Please complete the checkout details and select at least one item.")
      return null
    }

    setSubmitting(true)
    setError(null)
    setSubmitted(false)

    try {
      const currentUser = await getCurrentUser()
      const user = currentUser?.profile

      if (!user) {
        setError("Please sign in before confirming your order.")
        return null
      }

      const order = await submitOrder(buildPayload(user.id))
      setSubmitted(true)
      setFormValues(initialFormValues)
      await onSuccess?.()
      return order
    } catch (submitError) {
      setError(getErrorMessage(submitError))
      return null
    } finally {
      setSubmitting(false)
    }
  }, [buildPayload, canSubmit, onSuccess])

  return {
    formValues,
    updateField,
    selectedItems,
    totalPrice,
    totalPriceLabel,
    canSubmit,
    submitting,
    error,
    submitted,
    confirmOrder,
    clearCheckoutError: () => setError(null),
  }
}
