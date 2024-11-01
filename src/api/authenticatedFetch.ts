export const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
        throw new Error("Authentication token missing.");
    }

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response;
};
