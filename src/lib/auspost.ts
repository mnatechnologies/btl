/**
 * Australia Post eParcel API Integration
 * API Documentation: https://auspost.com.au/business/shipping/api-integration
 */

interface AusPostConfig {
  apiKey: string
  accountNumber: string
  password: string
  baseUrl: string
}

interface ShipmentAddress {
  name: string
  lines: string[]
  suburb: string
  state: string
  postcode: string
  country?: string
  phone?: string
  email?: string
}

interface ShipmentItem {
  itemDescription: string
  productId: string
  length: number  // in cm
  width: number   // in cm
  height: number  // in cm
  weight: number  // in kg
}

interface CreateShipmentRequest {
  shipments: Array<{
    shipment_reference?: string
    customer_reference_1?: string
    customer_reference_2?: string
    email_tracking_enabled?: boolean
    from: ShipmentAddress
    to: ShipmentAddress
    items: ShipmentItem[]
  }>
}

interface LabelResponse {
  shipments: Array<{
    shipment_id: string
    shipment_reference: string
    shipment_creation_date: string
    tracking_details: {
      article_id: string
      consignment_id: string
    }
    items: Array<{
      item_id: string
      tracking_details: {
        article_id: string
      }
    }>
  }>
}

export class AusPostClient {
  private config: AusPostConfig

  constructor() {
    this.config = {
      apiKey: process.env.AUSPOST_API_KEY || '',
      accountNumber: process.env.AUSPOST_ACCOUNT_NUMBER || '',
      password: process.env.AUSPOST_PASSWORD || '',
      baseUrl: process.env.AUSPOST_API_URL || 'https://digitalapi.auspost.com.au'
    }

    if (!this.config.apiKey) {
      throw new Error('AUSPOST_API_KEY is required')
    }
    if (!this.config.accountNumber) {
      throw new Error('AUSPOST_ACCOUNT_NUMBER is required')
    }
    if (!this.config.password) {
      throw new Error('AUSPOST_PASSWORD is required')
    }
  }

  /**
   * Generate authentication header for API requests
   */
  private getAuthHeader(): string {
    const credentials = `${this.config.accountNumber}:${this.config.password}`
    return `Basic ${Buffer.from(credentials).toString('base64')}`
  }

  /**
   * Create a shipment and generate label
   */
  async createShipment(request: CreateShipmentRequest): Promise<LabelResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/shipping/v1/shipments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Account-Number': this.config.accountNumber,
          'Authorization': this.getAuthHeader(),
          'API-Key': this.config.apiKey
        },
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`AusPost API error (${response.status}): ${errorText}`)
      }

      const data = await response.json() as LabelResponse
      return data
    } catch (error) {
      console.error('AusPost API error:', error)
      throw error
    }
  }

  /**
   * Get label as PDF
   */
  async getLabel(shipmentId: string, format: 'pdf' | 'zpl' = 'pdf'): Promise<Buffer> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/shipping/v1/labels/${shipmentId}?format=${format}`,
        {
          headers: {
            'Account-Number': this.config.accountNumber,
            'Authorization': this.getAuthHeader(),
            'API-Key': this.config.apiKey
          }
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`AusPost Label API error (${response.status}): ${errorText}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      return Buffer.from(arrayBuffer)
    } catch (error) {
      console.error('AusPost Label API error:', error)
      throw error
    }
  }

  /**
   * Track a shipment by article ID
   */
  async trackShipment(articleId: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/shipping/v1/track?article_id=${articleId}`,
        {
          headers: {
            'API-Key': this.config.apiKey
          }
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`AusPost Tracking API error (${response.status}): ${errorText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('AusPost Tracking API error:', error)
      throw error
    }
  }
}

/**
 * Helper function to create a shipment for an order
 */
export async function createLabelForOrder(orderId: string, orderData: {
  customerName: string
  customerEmail: string
  customerPhone?: string
  shippingAddress: {
    line1: string
    line2?: string
    suburb: string
    state: string
    postcode: string
    country?: string
  }
  items: Array<{
    description: string
    quantity: number
  }>
  senderAddress?: {
    name: string
    line1: string
    line2?: string
    suburb: string
    state: string
    postcode: string
    country?: string
    phone?: string
    email?: string
  }
}) {
  const client = new AusPostClient()

  // Default sender address (your business address)
  const defaultSender: ShipmentAddress = {
    name: orderData.senderAddress?.name || process.env.AUSPOST_SENDER_NAME || 'Built To Last',
    lines: [
      orderData.senderAddress?.line1 || process.env.AUSPOST_SENDER_ADDRESS_LINE1 || '',
      orderData.senderAddress?.line2 || process.env.AUSPOST_SENDER_ADDRESS_LINE2 || ''
    ].filter(Boolean),
    suburb: orderData.senderAddress?.suburb || process.env.AUSPOST_SENDER_SUBURB || '',
    state: orderData.senderAddress?.state || process.env.AUSPOST_SENDER_STATE || '',
    postcode: orderData.senderAddress?.postcode || process.env.AUSPOST_SENDER_POSTCODE || '',
    country: orderData.senderAddress?.country || 'AU',
    phone: orderData.senderAddress?.phone || process.env.AUSPOST_SENDER_PHONE || '',
    email: orderData.senderAddress?.email || process.env.AUSPOST_SENDER_EMAIL || ''
  }

  const recipient: ShipmentAddress = {
    name: orderData.customerName,
    lines: [
      orderData.shippingAddress.line1,
      orderData.shippingAddress.line2
    ].filter(Boolean),
    suburb: orderData.shippingAddress.suburb,
    state: orderData.shippingAddress.state,
    postcode: orderData.shippingAddress.postcode,
    country: orderData.shippingAddress.country || 'AU',
    phone: orderData.customerPhone,
    email: orderData.customerEmail
  }

  // Convert order items to shipment items
  // Default parcel dimensions for clothing items
  const shipmentItems: ShipmentItem[] = orderData.items.map((item, index) => ({
    itemDescription: item.description,
    productId: `PR${index + 1}`,
    length: 30,  // 30cm - adjust based on your product
    width: 25,   // 25cm
    height: 5,   // 5cm
    weight: 0.5  // 0.5kg per item - adjust based on your product
  }))

  const shipmentRequest: CreateShipmentRequest = {
    shipments: [{
      shipment_reference: orderId,
      customer_reference_1: `Order ${orderId}`,
      email_tracking_enabled: true,
      from: defaultSender,
      to: recipient,
      items: shipmentItems
    }]
  }

  const response = await client.createShipment(shipmentRequest)
  
  if (response.shipments && response.shipments.length > 0) {
    const shipment = response.shipments[0]
    const trackingId = shipment.tracking_details.article_id
    const shipmentId = shipment.shipment_id

    // Get the label PDF
    const labelPdf = await client.getLabel(shipmentId, 'pdf')

    return {
      shipmentId,
      trackingId,
      consignmentId: shipment.tracking_details.consignment_id,
      labelPdf,
      shipmentData: shipment
    }
  }

  throw new Error('No shipment created')
}
