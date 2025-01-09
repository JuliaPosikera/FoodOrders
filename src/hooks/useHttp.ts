import { useEffect, useState, useCallback } from "react";

interface HttpRequestConfig {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

interface UseHttpResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  sendRequest: (data?: any) => Promise<void>;
  clearData: () => void;
}

async function sendHttpRequest<T>(
  url: string,
  config: HttpRequestConfig
): Promise<T> {
  const response = await fetch(url, config);

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request"
    );
  }
  return resData;
}

export default function useHttp<T>(
  url: string,
  config: HttpRequestConfig | undefined,
  initialData?: T
): UseHttpResult<T> {
  const [data, setData] = useState<T | null>(initialData || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function clearData(): void {
    if (initialData) {
      setData(initialData);
    }
  }

  const sendRequest = useCallback(
    async function sendRequest(data?: any): Promise<void> {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest<T>(url, {
          ...config,
          body: data,
        });
        setData(resData);
      } catch (err: any) {
        console.error("Error", err);
        setError(err.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { data, isLoading, error, sendRequest, clearData };
}

// async function sendHttpRequest(url, config) {
//   const response = await fetch(url, config);

//   const resData = await response.json();
//   if (!response.ok) {
//     throw new Error(
//       resData.message || "something went wrong, failed to send request"
//     );
//   }
//   return resData;
// }

// export default function useHttp(url, config, initialData) {
//   const [data, setData] = useState(initialData);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();

//   function clearData() {
//     setData(initialData);
//   }

//   const sendRequest = useCallback(
//     async function sendRequest(data) {
//       setIsLoading(true);
//       try {
//         const resData = await sendHttpRequest(url, { ...config, body: data });
//         setData(resData);
//       } catch (error) {
//         console.error("Error");
//         setError(error.message || "Something went wrong!");
//       }
//       setIsLoading(false);
//     },
//     [url, config]
//   );

//   useEffect(() => {
//     if ((config && (config.method === "GET" || !config.method)) || !config) {
//       sendRequest();
//     }
//   }, [sendRequest, config]);
//   return { data, isLoading, error, sendRequest, clearData };
