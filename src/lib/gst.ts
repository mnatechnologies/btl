export interface GSTBreakdown {
  totalIncGst: number
  gstAmount: number
  totalExGst: number
}


export function calculateGST(totalCents: number): GSTBreakdown {
  // GST is 1/11th of the total when price includes GST
  // (100 + 10% = 110, so 10/110 = 1/11)
  const gstAmount = Math.round(totalCents / 11)
  const totalExGst = totalCents - gstAmount

  return {
    totalIncGst: totalCents,
    gstAmount,
    totalExGst
  }
}

export function formatGST(totalCents: number) {
  const { totalExGst, gstAmount, totalIncGst } = calculateGST(totalCents)

  return {
    exGst: `$${(totalExGst / 100).toFixed(2)}`,
    gst: `$${(gstAmount / 100).toFixed(2)}`,
    incGst: `$${(totalIncGst / 100).toFixed(2)}`,
  }
}

