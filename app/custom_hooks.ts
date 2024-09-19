import useSWR from 'swr';
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FormState } from "./lib/definitions";
import { EnumLike } from "zod";
import { customTableInterface, customssrgetInterface } from "./interface";


interface propsData {
    fn:(state: FormState, formData: FormData) => void | any,
}


enum EnumMessage {
    LOADING = 'Loading',
    SUCCESS = 'Success',
    ERROR = 'Error',
}



export const useCustomActionState = ({fn}: propsData) => {
    const [state, setState] = useState<FormState | any>(null);
    const [status, setStatus] = useState<EnumMessage | null>();
    const [error, setError] = useState<string | null>(null);
    
    const action = async (formData: FormData) => {
        try {
            setStatus(EnumMessage.LOADING)
            setState(null);

            const fdata = await fn(state, formData);

            if(fdata.errors) {
                setState(fdata);
                setStatus(EnumMessage.ERROR)
            } else {
                setStatus(EnumMessage.SUCCESS)
            }
            return fdata;

        } catch(err:any) {
            setError(err)
        }
    }

    return {
        state,
        action,
        status,
        error,
        EnumMessage
    }
}


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