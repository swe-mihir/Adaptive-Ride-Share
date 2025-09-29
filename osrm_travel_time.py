import requests
import json
from typing import Tuple, Optional, Union


def get_travel_time(driver_coords: Tuple[float, float], 
                   user_coords: Tuple[float, float],
                   osrm_server: str = "http://localhost:5000",
                   timeout: int = 10) -> Optional[float]:
    """
    Calculate travel time between driver and user using OSRM routing service.
    
    Parameters:
    -----------
    driver_coords : tuple
        Driver coordinates as (latitude, longitude)
    user_coords : tuple
        User coordinates as (latitude, longitude)
    osrm_server : str, optional
        OSRM server URL (default: local OSRM server at localhost:5000)
    timeout : int, optional
        Request timeout in seconds (default: 10)
    
    Returns:
    --------
    float or None
        Travel duration in seconds, or None if request fails
    
    Raises:
    -------
    ValueError
        If coordinates are invalid (not numeric or out of range)
    
    Examples:
    ---------
    >>> # Calculate time between two points using local OSRM server
    >>> driver_pos = (52.517037, 13.388860)  # Berlin coordinates
    >>> user_pos = (52.529407, 13.397634)    # Another location in Berlin
    >>> duration = get_travel_time(driver_pos, user_pos)
    >>> print(f"Travel time: {duration} seconds")
    
    >>> # Using custom OSRM server port
    >>> duration = get_travel_time(driver_pos, user_pos, 
    ...                           osrm_server="http://localhost:8080")
    """
    
    # Validate input coordinates
    try:
        driver_lat, driver_lon = float(driver_coords[0]), float(driver_coords[1])
        user_lat, user_lon = float(user_coords[0]), float(user_coords[1])
    except (TypeError, ValueError, IndexError) as e:
        raise ValueError(f"Invalid coordinate format: {e}")
    
    # Validate coordinate ranges
    if not (-90 <= driver_lat <= 90) or not (-180 <= driver_lon <= 180):
        raise ValueError(f"Driver coordinates out of range: ({driver_lat}, {driver_lon})")
    
    if not (-90 <= user_lat <= 90) or not (-180 <= user_lon <= 180):
        raise ValueError(f"User coordinates out of range: ({user_lat}, {user_lon})")
    
    # Build OSRM API URL
    # OSRM format: /route/v1/{profile}/{coordinates}
    # Coordinates format: lon,lat;lon,lat (note: longitude first!)
    osrm_server = osrm_server.rstrip('/')  # Remove trailing slash
    coordinates = f"{driver_lon},{driver_lat};{user_lon},{user_lat}"
    url = f"{osrm_server}/route/v1/driving/{coordinates}"
    
    # Add query parameters for minimal response
    params = {
        'overview': 'false',  # Don't need route geometry
        'steps': 'false',     # Don't need turn-by-turn directions
        'geometries': 'geojson'  # Standard format
    }
    
    try:
        # Make request to OSRM server
        print(f"Requesting: {url}")
        response = requests.get(url, params=params, timeout=timeout)
        response.raise_for_status()  # Raise exception for bad HTTP status
        
        # Parse JSON response
        data = response.json()
        
        # Check OSRM response status
        if data.get('code') != 'Ok':
            print(f"OSRM API error: {data.get('message', 'Unknown error')}")
            return None
        
        # Extract duration from first route
        routes = data.get('routes', [])
        if not routes:
            print("No routes found in OSRM response")
            return None
        
        duration = routes[0].get('duration')
        if duration is None:
            print("Duration not found in route data")
            return None
        
        return float(duration)
        
    except requests.exceptions.Timeout:
        print(f"Request timeout after {timeout} seconds")
        return None
    
    except requests.exceptions.ConnectionError:
        print(f"Failed to connect to OSRM server: {osrm_server}")
        return None
    
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        return None
    
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return None
    
    except (json.JSONDecodeError, KeyError, TypeError) as e:
        print(f"Failed to parse OSRM response: {e}")
        return None
    
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None


def get_travel_time_with_details(driver_coords: Tuple[float, float], 
                                user_coords: Tuple[float, float],
                                osrm_server: str = "http://localhost:5000",
                                timeout: int = 10) -> dict:
    """
    Calculate travel time and distance with additional route details.
    
    Parameters:
    -----------
    driver_coords : tuple
        Driver coordinates as (latitude, longitude)
    user_coords : tuple
        User coordinates as (latitude, longitude)
    osrm_server : str, optional
        OSRM server URL (default: local OSRM server at localhost:5000)
    timeout : int, optional
        Request timeout in seconds (default: 10)
    
    Returns:
    --------
    dict
        Dictionary containing:
        - 'duration': travel time in seconds (float or None)
        - 'distance': travel distance in meters (float or None)
        - 'success': whether the request succeeded (bool)
        - 'error': error message if failed (str or None)
    """
    
    result = {
        'duration': None,
        'distance': None,
        'success': False,
        'error': None
    }
    
    try:
        # Validate coordinates (reuse validation from main function)
        driver_lat, driver_lon = float(driver_coords[0]), float(driver_coords[1])
        user_lat, user_lon = float(user_coords[0]), float(user_coords[1])
        
        # Validate ranges
        if not (-90 <= driver_lat <= 90) or not (-180 <= driver_lon <= 180):
            raise ValueError(f"Driver coordinates out of range: ({driver_lat}, {driver_lon})")
        
        if not (-90 <= user_lat <= 90) or not (-180 <= user_lon <= 180):
            raise ValueError(f"User coordinates out of range: ({user_lat}, {user_lon})")
        
        # Build URL and make request
        osrm_server = osrm_server.rstrip('/')
        coordinates = f"{driver_lon},{driver_lat};{user_lon},{user_lat}"
        url = f"{osrm_server}/route/v1/driving/{coordinates}"
        
        params = {
            'overview': 'false',
            'steps': 'false',
            'geometries': 'geojson'
        }
        
        response = requests.get(url, params=params, timeout=timeout)
        response.raise_for_status()
        
        data = response.json()
        
        if data.get('code') != 'Ok':
            result['error'] = f"OSRM API error: {data.get('message', 'Unknown error')}"
            return result
        
        routes = data.get('routes', [])
        if not routes:
            result['error'] = "No routes found"
            return result
        
        route = routes[0]
        result['duration'] = route.get('duration')
        result['distance'] = route.get('distance')
        result['success'] = True
        
        return result
        
    except Exception as e:
        result['error'] = str(e)
        return result


# Usage Instructions
"""
SETUP INSTRUCTIONS FOR LOCAL OSRM:

1. Prerequisites:
   - Install Docker (recommended) or build OSRM from source
   - Download OSM data for your region from http://download.geofabrik.de/

2. Using Docker (Recommended):
   # Download OSM data (example for a specific region)
   wget http://download.geofabrik.de/europe/germany-latest.osm.pbf
   
   # Extract data
   docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-extract -p /opt/car.lua /data/germany-latest.osm.pbf
   
   # Partition data
   docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-partition /data/germany-latest.osrm
   
   # Customize data
   docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-customize /data/germany-latest.osrm
   
   # Run OSRM server
   docker run -t -i -p 5000:5000 -v "${PWD}:/data" osrm/osrm-backend osrm-routed --algorithm mld /data/germany-latest.osrm

3. Test your local setup:
   curl "http://localhost:5000/route/v1/driving/13.388860,52.517037;13.397634,52.529407"

USAGE:

1. Import the functions:
   from osrm_travel_time import get_travel_time, get_travel_time_with_details

2. Basic usage with local OSRM server:
   driver_coords = (52.517037, 13.388860)  # Berlin coordinates (lat, lon)
   user_coords = (52.529407, 13.397634)    # Another location in Berlin
   
   # Get travel time in seconds
   duration = get_travel_time(driver_coords, user_coords, 
                             osrm_server="http://localhost:5000")
   
   if duration:
       print(f"Travel time: {duration} seconds ({duration/60:.1f} minutes)")
   else:
       print("Could not calculate route")

3. Get detailed route information:
   details = get_travel_time_with_details(driver_coords, user_coords,
                                         osrm_server="http://localhost:5000")
   
   if details['success']:
       print(f"Duration: {details['duration']} seconds")
       print(f"Distance: {details['distance']} meters")
   else:
       print(f"Error: {details['error']}")

4. Configuration options:
   - osrm_server: Your local OSRM server URL (default: "http://localhost:5000")
   - timeout: Request timeout in seconds (default: 10)

NOTES:
- Ensure your OSRM server is running before using these functions
- Use coordinates within the region of your OSM data
- For large-scale applications, consider load balancing multiple OSRM instances
- Monitor server resources as OSRM can be memory-intensive
"""