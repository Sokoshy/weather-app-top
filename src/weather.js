export async function getWeather(location) {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=${process.env.WEBPACK_VISUAL_CROSSING_KEY}`);

    if(!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const locationData = await response.json();

  return locationData;

  } catch (error) {
    console.log(error);
  }
}
