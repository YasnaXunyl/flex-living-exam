import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Reservation {
  id: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "confirmed" | "pending" | "cancelled";
  total: number;
}

const mockReservations: Reservation[] = [
  {
    id: "1",
    guestName: "John Doe",
    checkIn: "2025-10-01",
    checkOut: "2025-10-05",
    guests: 2,
    status: "confirmed",
    total: 1000,
  },
  {
    id: "2",
    guestName: "Jane Smith",
    checkIn: "2025-10-07",
    checkOut: "2025-10-10",
    guests: 3,
    status: "pending",
    total: 750,
  },
];

const statusStyles = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
};

export function ReservationTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Reservations</h2>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockReservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-medium">
                {reservation.guestName}
              </TableCell>
              <TableCell>{reservation.checkIn}</TableCell>
              <TableCell>{reservation.checkOut}</TableCell>
              <TableCell>{reservation.guests}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={statusStyles[reservation.status]}
                >
                  {reservation.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                ${reservation.total.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
