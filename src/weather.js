export async function getWeather(location, isCelsius) {
  const metric = isCelsius ? "metric" : "us"
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${metric}&key=${process.env.WEBPACK_VISUAL_CROSSING_KEY}`);

    if(!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const locationData = await response.json();

  return locationData;

  } catch (error) {
    throw error;
  }
}

export function processWeatherData(raw) {
  return { address: raw.resolvedAddress, temp: raw.currentConditions.temp, condition: raw.currentConditions.conditions, icon: raw.currentConditions.icon, tempmax: raw.days[0].tempmax, tempmin: raw.days[0].tempmin };
}
