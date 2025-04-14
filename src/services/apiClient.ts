type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string>;
};

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private getUrl(endpoint: string, options?: RequestOptions): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    return url.toString();
  }

  private getHeaders(options?: RequestOptions): HeadersInit {
    return {
      ...this.defaultHeaders,
      ...options?.headers,
    };
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response = await fetch(this.getUrl(endpoint, options), {
      method: 'GET',
      headers: this.getHeaders(options),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  async post<T>(endpoint: string, data: unknown, options?: RequestOptions): Promise<T> {
    const response = await fetch(this.getUrl(endpoint, options), {
      method: 'POST',
      headers: this.getHeaders(options),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  async put<T>(endpoint: string, data: unknown, options?: RequestOptions): Promise<T> {
    const response = await fetch(this.getUrl(endpoint, options), {
      method: 'PUT',
      headers: this.getHeaders(options),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response = await fetch(this.getUrl(endpoint, options), {
      method: 'DELETE',
      headers: this.getHeaders(options),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  setAuthToken(token: string | null) {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders['Authorization'];
    }
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient(import.meta.env.VITE_API_URL || '/api');