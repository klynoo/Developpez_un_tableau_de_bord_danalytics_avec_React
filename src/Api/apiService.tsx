export async function fetchData<T>(
  url: string
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(`http://localhost:3000${url}`);
    const result = await response.json();

    return { data: result.data ?? result, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
}
