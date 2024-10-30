const API_URL = process.env.REACT_APP_API_URL;

interface ApiResponse<T> {
  data: T | null;
  error?: string;
}
export async function fetchData<T>(
  url: string
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(`http://localhost:3000${url}`);
    const result = await response.json();

    // Retourner directement `result.data` si c'est disponible, sinon `result`
    return { data: result.data ?? result, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
}
