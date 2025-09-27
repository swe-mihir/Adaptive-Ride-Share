import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    
    const { pickupAddress, dropoffAddress, notes } = body;

    if (!pickupAddress || !dropoffAddress) {
      return Response.json({ error: 'Pickup and dropoff addresses are required' }, { status: 400 });
    }

    // For now, we'll use placeholder coordinates (in a real app, you'd geocode the addresses)
    const pickupLat = 40.7128 + (Math.random() - 0.5) * 0.1; // NYC area
    const pickupLng = -74.0060 + (Math.random() - 0.5) * 0.1;
    const dropoffLat = 40.7128 + (Math.random() - 0.5) * 0.1;
    const dropoffLng = -74.0060 + (Math.random() - 0.5) * 0.1;

    // Calculate basic distance and fare (simplified)
    const distanceKm = Math.sqrt(
      Math.pow(dropoffLat - pickupLat, 2) + Math.pow(dropoffLng - pickupLng, 2)
    ) * 111; // rough km conversion

    const fareAmount = Math.max(5.00, distanceKm * 2.5); // $2.50 per km, minimum $5
    const estimatedDuration = Math.ceil(distanceKm * 3); // 3 minutes per km

    // Create the ride request
    const rideResult = await sql`
      INSERT INTO rides (
        passenger_id,
        pickup_location,
        pickup_address,
        dropoff_location,
        dropoff_address,
        distance_km,
        fare_amount,
        estimated_duration_minutes,
        notes
      ) VALUES (
        ${userId},
        ST_MakePoint(${pickupLng}, ${pickupLat}),
        ${pickupAddress},
        ST_MakePoint(${dropoffLng}, ${dropoffLat}),
        ${dropoffAddress},
        ${distanceKm.toFixed(2)},
        ${fareAmount.toFixed(2)},
        ${estimatedDuration},
        ${notes || null}
      )
      RETURNING *
    `;

    const ride = rideResult[0];

    // Find nearby available drivers (simplified matching)
    await findAndNotifyDrivers(ride.id, pickupLng, pickupLat);

    return Response.json({
      id: ride.id,
      pickup_address: ride.pickup_address,
      dropoff_address: ride.dropoff_address,
      ride_status: ride.ride_status,
      fare_amount: ride.fare_amount,
      estimated_duration_minutes: ride.estimated_duration_minutes,
      requested_at: ride.requested_at
    });
    
  } catch (error) {
    console.error('Error creating ride request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function findAndNotifyDrivers(rideId, pickupLng, pickupLat) {
  try {
    // Find available drivers within 10km (simplified)
    const availableDrivers = await sql`
      SELECT d.user_id, d.id as driver_id
      FROM drivers d
      WHERE d.driver_status = 'available'
        AND d.current_location IS NOT NULL
        AND ST_DWithin(
          d.current_location,
          ST_MakePoint(${pickupLng}, ${pickupLat}),
          0.1
        )
      LIMIT 5
    `;

    // Send ride requests to drivers
    for (const driver of availableDrivers) {
      await sql`
        INSERT INTO ride_requests (ride_id, driver_id)
        VALUES (${rideId}, ${driver.user_id})
      `;
    }

    console.log(`Sent ride requests to ${availableDrivers.length} drivers for ride ${rideId}`);
    
  } catch (error) {
    console.error('Error notifying drivers:', error);
  }
}