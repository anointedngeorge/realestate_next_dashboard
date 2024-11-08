import useSWR from 'swr';
import  {  useState } from "react"
import { FormState } from "./lib/definitions";
import {  customssrgetInterface } from "./interface";

interface FData {
  errors?: Record<string, string> | string | Record<string, string>[] | string[] | number | [] | object;
}

interface PropsData {
  fn: (state: FormState, formData: FormData) => Promise<FData | void>;
}


enum EnumMessage {
    LOADING = 'Loading',
    SUCCESS = 'Success',
    ERROR = 'Error',
}



export const useCustomActionState = ({ fn }: PropsData) => {
  const [state, setState] = useState<FormState>();
  const [status, setStatus] = useState<EnumMessage | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const action = async (formData: FormData): Promise<FData | void> => {
      try {
          setStatus(EnumMessage.LOADING);
          // setState();

          const fdata = await fn(state, formData);

          if (fdata && "errors" in fdata) { // Check if fdata has errors
              setState(fdata as FormState); // Assuming fdata has a similar structure to FormState
              setStatus(EnumMessage.ERROR);
          } else {
              setStatus(EnumMessage.SUCCESS);
          }

          return fdata;
      } catch (err) {
          setError(err instanceof Error ? err.message : "An unknown error occurred");
          setStatus(EnumMessage.ERROR);
      }
  };

  return {
      state,
      action,
      status,
      error,
      EnumMessage,
  };
};


const fetcher = async (url: string, headers?: HeadersInit) => {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

export const useCustomSSR = (props: customssrgetInterface) => {
  const timer = props.mutatetime || 2000;

  // Use SWR for data fetching
  const { data: ssrdata, error: ssrerror, isValidating: ssrstatus, mutate: cssrmutate } = useSWR(
    props.url ? props.url : null, 
    () => fetcher(props.url, props.headers),
    {
      revalidateOnFocus: false,
      dedupingInterval: timer,
    }
  );

  return {
    ssrdata,
    ssrstatus: !!ssrstatus,
    ssrerror,
    cssrmutate,
  };
};