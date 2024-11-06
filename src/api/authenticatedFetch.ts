// Helper function to get a specific cookie by name
const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
};

export const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = getCookie("token"); // Retrieve token from cookie

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
