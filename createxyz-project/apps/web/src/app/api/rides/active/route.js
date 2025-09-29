import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Get user's active ride (pending, matched, or in_progress)
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
        AND r.ride_status IN ('pending', 'matched', 'in_progress')
      ORDER BY r.requested_at DESC
      LIMIT 1
    `;

    if (rides.length === 0) {
      return Response.json(null);
    }

    const ride = rides[0];

    return Response.json({
      id: ride.id,
      pickup_address: ride.pickup_address,
      dropoff_address: ride.dropoff_address,
      ride_status: ride.ride_status,
      fare_amount: ride.fare_amount,
      estimated_duration_minutes: ride.estimated_duration_minutes,
      requested_at: ride.requested_at,
      matched_at: ride.matched_at,
      started_at: ride.started_at,
      driver_name: ride.driver_name,
      vehicle_make: ride.vehicle_make,
      vehicle_model: ride.vehicle_model,
      vehicle_color: ride.vehicle_color,
      license_plate: ride.license_plate,
      notes: ride.notes
    });
    
  } catch (error) {
    console.error('Error fetching active ride:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}