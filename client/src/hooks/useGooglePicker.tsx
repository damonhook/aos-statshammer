import loadScript from 'load-script';
import { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    loadingGAPI: boolean;
    gapi: any;
    google: any;
  }
}

interface IPicker {
  setVisible: (v: boolean) => void;
}

const GOOGLE_SDK_URL = 'https://apis.google.com/js/api.js';
const DEVELOPER_KEY = 'AIzaSyCrsTCtNSfZnWjklfG-gSXWDE-R2zX9K-Q';
const CLIENT_ID = '360651691028-ceuc9mee53gjhtmpoetsb58ac57lcbgo.apps.googleusercontent.com';

const useGooglePicker = (onPickedCallback: (data: any) => void) => {
  const [error, setError] = useState(false);
  const [pickerLoaded, setPickerLoaded] = useState(false);
  const [oAuthToken, setOAuthToken] = useState<string | undefined>(undefined);
  const [picker, setPicker] = useState<IPicker | undefined>(undefined);

  const onAuthApiLoad = useCallback(() => {
    window.gapi.auth.authorize(
      {
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/drive.file',
        immediate: false,
      },
      (result: any) => {
        if (result && !result.error) {
          setError(false);
          setOAuthToken(result.access_token);
        } else {
          setError(true);
        }
      },
    );
  }, []);

  const onApiLoad = useCallback(() => {
    window.gapi.load('auth', { callback: onAuthApiLoad });
    window.gapi.load('picker', {
      callback: () => {
        setPickerLoaded(true);
      },
    });
  }, [onAuthApiLoad]);

  useEffect(() => {
    if (!window?.loadingGAPI) {
      setError(false);
      window.loadingGAPI = true;
      loadScript(GOOGLE_SDK_URL, onApiLoad);
    }
  }, [onApiLoad]);

  const pickerCallback = (data: any) => {
    onPickedCallback(data);
  };

  if (!picker && pickerLoaded && oAuthToken && window?.google?.picker) {
    const view = new window.google.picker.View(window.google.picker.ViewId.DOCS);
    view.setMimeTypes('application/json');
    const newPicker: IPicker = new window.google.picker.PickerBuilder()
      // .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
      .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
      .setAppId('360651691028')
      .setOAuthToken(oAuthToken)
      .addView(view)
      .setDeveloperKey(DEVELOPER_KEY)
      .setCallback(pickerCallback)
      .build();
    setPicker(newPicker);
  }

  const setVisible = (visible: boolean) => {
    if (pickerLoaded && oAuthToken && picker) picker.setVisible(visible);
  };

  const isReady = Boolean(pickerLoaded && oAuthToken && picker);
  return { isReady, setVisible, error };
};

export default useGooglePicker;
