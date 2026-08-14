export interface TicketCategory {
  id: number;
  eventId: number;
  name: string;
  price: number;
  totalCapacity: number;
  availableStock: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  venue: string;
  eventDate: string;
  status: string;
  imageUrl?: string;
  ticketCategories: TicketCategory[];
}

export interface ReservationRequest {
  userId: number;
  ticketCategoryId: number;
  quantity: number;
}

export interface ReservationResponse {
  bookingId?: number;
  bookingReference: string;
  status: string;
  totalAmount: number;
  userName: string;
  ticketCategoryName?: string;
  eventTitle?: string;
  seatInfo?: string;
}
