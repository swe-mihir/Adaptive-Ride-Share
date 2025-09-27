import { useState, useEffect, useCallback } from "react";
import useUser from "@/utils/useUser";

export function useDriverDashboard() {
  const { data: user, loading: userLoading } = useUser();
  const [driverProfile, setDriverProfile] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [activeRide, setActiveRide] = useState(null);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [acceptedRides, setAcceptedRides] = useState([]);
  const [rideHistory, setRideHistory] = useState([]);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    licensePlate: "",
  });

  const fetchDriverProfile = useCallback(async () => {
    try {
      const response = await fetch("/api/driver/profile");
      if (response.ok) {
        const profile = await response.json();
        setDriverProfile(profile);
        setIsOnline(profile?.driver_status === "available");
        if (profile) {
          setVehicleData({
            vehicleMake: profile.vehicle_make || "",
            vehicleModel: profile.vehicle_model || "",
            vehicleYear: profile.vehicle_year || "",
            vehicleColor: profile.vehicle_color || "",
            licensePlate: profile.license_plate || "",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching driver profile:", error);
    }
  }, []);

  const fetchIncomingRequests = useCallback(async () => {
    try {
      const response = await fetch("/api/driver/requests");
      if (response.ok) {
        const requests = await response.json();
        setIncomingRequests(requests);
      }
    } catch (error) {
      console.error("Error fetching incoming requests:", error);
    }
  }, []);

  const fetchAcceptedRides = useCallback(async () => {
    try {
      const response = await fetch("/api/driver/rides/accepted");
      if (response.ok) {
        const rides = await response.json();
        setAcceptedRides(rides);
        const active = rides.find((ride) => ride.ride_status === "in_progress");
        setActiveRide(active || null);
      }
    } catch (error) {
      console.error("Error fetching accepted rides:", error);
    }
  }, []);

  const fetchRideHistory = useCallback(async () => {
    try {
      const response = await fetch("/api/driver/rides/history");
      if (response.ok) {
        const history = await response.json();
        setRideHistory(history);
      }
    } catch (error) {
      console.error("Error fetching ride history:", error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchDriverProfile();
      fetchIncomingRequests();
      fetchAcceptedRides();
      fetchRideHistory();
    }
  }, [user, fetchDriverProfile, fetchIncomingRequests, fetchAcceptedRides, fetchRideHistory]);

  useEffect(() => {
    if (isOnline) {
      const interval = setInterval(() => {
        fetchIncomingRequests();
        fetchAcceptedRides();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isOnline, fetchIncomingRequests, fetchAcceptedRides]);

  const toggleOnlineStatus = async () => {
    if (!driverProfile) {
      setShowVehicleForm(true);
      return;
    }
    try {
      const newStatus = isOnline ? "offline" : "available";
      const response = await fetch("/api/driver/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setIsOnline(!isOnline);
        if (!isOnline) setIncomingRequests([]);
      }
    } catch (error) {
      console.error("Error updating online status:", error);
    }
  };

  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/driver/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehicleData),
      });
      if (response.ok) {
        setShowVehicleForm(false);
        await fetchDriverProfile();
      } else {
        alert("Failed to save vehicle information.");
      }
    } catch (error) {
      console.error("Error saving vehicle info:", error);
      alert("Failed to save vehicle information.");
    }
  };

  const handleAcceptRide = async (requestId) => {
    try {
      const response = await fetch(`/api/driver/requests/${requestId}/accept`, { method: "POST" });
      if (response.ok) {
        fetchIncomingRequests();
        fetchAcceptedRides();
      } else {
        alert("Failed to accept ride.");
      }
    } catch (error) {
      console.error("Error accepting ride:", error);
      alert("Failed to accept ride.");
    }
  };

  const handleDeclineRide = async (requestId) => {
    try {
      const response = await fetch(`/api/driver/requests/${requestId}/decline`, { method: "POST" });
      if (response.ok) {
        fetchIncomingRequests();
      } else {
        alert("Failed to decline ride.");
      }
    } catch (error) {
      console.error("Error declining ride:", error);
      alert("Failed to decline ride.");
    }
  };

  return {
    user,
    userLoading,
    driverProfile,
    isOnline,
    activeRide,
    incomingRequests,
    acceptedRides,
    rideHistory,
    showVehicleForm,
    setShowVehicleForm,
    vehicleData,
    setVehicleData,
    toggleOnlineStatus,
    handleVehicleSubmit,
    handleAcceptRide,
    handleDeclineRide,
  };
}
