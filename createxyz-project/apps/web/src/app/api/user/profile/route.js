import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Get or create user profile
    let profiles = await sql`
      SELECT * FROM user_profiles WHERE user_id = ${userId}
    `;

    if (profiles.length === 0) {
      // Create default profile
      await sql`
        INSERT INTO user_profiles (user_id, role) 
        VALUES (${userId}, 'passenger')
      `;
      
      profiles = await sql`
        SELECT * FROM user_profiles WHERE user_id = ${userId}
      `;
    }

    const profile = profiles[0];
    
    return Response.json({
      id: profile.id,
      user_id: profile.user_id,
      role: profile.role,
      phone: profile.phone,
      created_at: profile.created_at,
      updated_at: profile.updated_at
    });
    
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    
    const { role, phone } = body;

    // Update user profile
    await sql`
      UPDATE user_profiles 
      SET role = COALESCE(${role}, role),
          phone = COALESCE(${phone}, phone),
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId}
    `;

    // Return updated profile
    const profiles = await sql`
      SELECT * FROM user_profiles WHERE user_id = ${userId}
    `;

    return Response.json(profiles[0]);
    
  } catch (error) {
    console.error('Error updating user profile:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}