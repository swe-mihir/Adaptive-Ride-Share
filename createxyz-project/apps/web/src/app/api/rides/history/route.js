import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Get user's completed or cancelled rides
    const rides = await sql`
      SELECT r.*, 
             au.name as driver_name,
             d.vehicle_make,
             d.vehicle_model,
             d.vehicle_color,
             d.license_plate
      FROM rides r
      LEFT JOIN auth_users au ON r.driver_id = au.id
      LEFT JOIN drivers d ON r.driver_id = d.user_id
      WHERE r.passenger_id = ${userId}
        AND r.ride_status IN ('completed', 'cancelled')
      ORDER BY r.requested_at DESC
      LIMIT 20
    `;

    return Response.json(
      rides.map(ride => ({
        id: ride.id,
        pickup_address: ride.pickup_address,
        dropoff_address: ride.dropoff_address,
        ride_status: ride.ride_status,
        fare_amount: ride.fare_amount,
        estimated_duration_minutes: ride.estimated_duration_minutes,
        requested_at: ride.requested_at,
        matched_at: ride.matched_at,
        started_at: ride.started_at,
        completed_at: ride.completed_at,
        cancelled_at: ride.cancelled_at,
        driver_name: ride.driver_name,
        vehicle_make: ride.vehicle_make,
        vehicle_model: ride.vehicle_model,
        vehicle_color: ride.vehicle_color,
        license_plate: ride.license_plate,
        passenger_rating: ride.passenger_rating,
        driver_rating: ride.driver_rating,
        notes: ride.notes
      }))
    );
    
  } catch (error) {
    console.error('Error fetching ride history:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}