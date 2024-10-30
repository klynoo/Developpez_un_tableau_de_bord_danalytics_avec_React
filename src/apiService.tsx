const API_URL = process.env.REACT_APP_API_URL;

interface ApiResponse<T> {
  data: T | null;
  error?: string;
}
async function fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    const errorMessage = (error as Error).message;
    return { data: null, error: errorMessage };
  }
}

export { fetchData };
