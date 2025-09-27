import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

export async function POST(request, { params }) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const rideId = params.id;

    // Verify the ride belongs to the user and can be cancelled
    const rides = await sql`
      SELECT * FROM rides 
      WHERE id = ${rideId} 
        AND passenger_id = ${userId}
        AND ride_status IN ('pending', 'matched')
    `;

    if (rides.length === 0) {
      return Response.json({ error: 'Ride not found or cannot be cancelled' }, { status: 404 });
    }

    // Cancel the ride
    await sql`
      UPDATE rides 
      SET ride_status = 'cancelled',
          cancelled_at = CURRENT_TIMESTAMP,
          cancellation_reason = 'Cancelled by passenger'
      WHERE id = ${rideId}
    `;

    // Cancel any pending ride requests for this ride
    await sql`
      UPDATE ride_requests 
      SET status = 'cancelled'
      WHERE ride_id = ${rideId} AND status = 'pending'
    `;

    return Response.json({ 
      message: 'Ride cancelled successfully',
      ride_id: rideId
    });
    
  } catch (error) {
    console.error('Error cancelling ride:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}