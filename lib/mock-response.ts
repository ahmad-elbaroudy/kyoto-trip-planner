// Hardcoded mock response. Values copied from Kyoto_Weekend_Prototype_Content_Pack.xlsx.
// Prices are USD for 2 guests.

export type MockStay = {
  title: string;
  neighbourhood: string;
  pricePerNight: number;
  totalForTwoNights: number;
  rating: number;
  checkIn: string;
  checkOut: string;
};

export type MockExperience = {
  title: string;
  date: string;
  startTime: string;
  durationHours: number;
  totalForTwoGuests: number;
  meetingPoint: string;
};

export type MockFood = {
  name: string;
  cuisine: string;
  meal: string;
  estCostForTwo: number;
  walkFromStayMin: number;
  bookingNote: string;
};

export const mockStay: MockStay = {
  title: "Restored machiya townhouse near Gion",
  neighbourhood: "Gion",
  pricePerNight: 168,
  totalForTwoNights: 366,
  rating: 4.92,
  checkIn: "2025-04-11",
  checkOut: "2025-04-13",
};

export const mockExperience: MockExperience = {
  title: "Tea ceremony in a 100-year-old machiya",
  date: "2025-04-12",
  startTime: "10:30",
  durationHours: 2,
  totalForTwoGuests: 116,
  meetingPoint: "Outside Gion-Shijo Station, exit 6",
};

export const mockFood: MockFood = {
  name: "Menya Inoichi",
  cuisine: "Ramen",
  meal: "Dinner",
  estCostForTwo: 34,
  walkFromStayMin: 8,
  bookingNote: "No reservations - arrive before 18:00",
};

export const mockReplyText = "Here's a sample weekend from the prototype pack.";
