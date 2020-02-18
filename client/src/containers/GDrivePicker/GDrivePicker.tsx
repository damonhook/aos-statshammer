import loadScript from 'load-script';
import React, { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    loadingGAPI: boolean;
    gapi: any;
    google: any;
  }
}

interface IGoogleChooserProps {
  developerKey: string;
  clientId: string;
}
const GoogleChooser = ({ developerKey, clientId }: IGoogleChooserProps) => {
  const GOOGLE_SDK_URL = 'https://apis.google.com/js/api.js';
  const [pickerLoaded, setPickerLoaded] = useState(false);
  const [oAuthToken, setOAuthToken] = useState<string | undefined>(undefined);

  const handleAuthResult = (result: any) => {
    if (result && !result.error) {
      setOAuthToken(result.access_token);
    }
  };

  const onAuthApiLoad = useCallback(() => {
    // window.gapi.auth2.init({ client_id: clientId }).then(googleAuth => {
    //   googleAuth.signIn({ scope: 'https://www.googleapis.com/auth/drive' }).then(result => {
    //     handleAuthResult(result);
    //   });
    // });
    window.gapi.auth.authorize(
      {
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/drive.file',
        immediate: false,
      },
      handleAuthResult,
    );
  }, [clientId]);

  const onPickerApiLoad = useCallback(() => {
    setPickerLoaded(true);
  }, []);

  const onApiLoad = useCallback(() => {
    window.gapi.load('auth', { callback: onAuthApiLoad });
    window.gapi.load('picker', { callback: onPickerApiLoad });
  }, [onAuthApiLoad, onPickerApiLoad]);

  useEffect(() => {
    if (!window?.loadingGAPI) {
      window.loadingGAPI = true;
      loadScript(GOOGLE_SDK_URL, onApiLoad);
    }
  }, [onApiLoad]);

  const pickerCallback = (data: any) => {
    console.log(data);
  };

  console.log(developerKey);

  if (pickerLoaded && oAuthToken && window?.google?.picker) {
    // const picker = new window.google.picker.PickerBuilder()
    //   .addView(window.google.picker.ViewId.DOCS)
    //   .setOAuthToken(oAuthToken)
    //   .setDeveloperKey(developerKey)
    //   .setCallback(pickerCallback)
    //   .build();
    // picker.setVisible(true);
    const view = new window.google.picker.View(window.google.picker.ViewId.DOCS);
    view.setMimeTypes('application/json');
    const picker = new window.google.picker.PickerBuilder()
      .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
      .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
      .setAppId('360651691028')
      .setOAuthToken(oAuthToken)
      .addView(view)
      // .addView(new window.google.picker.DocsUploadView())
      .setDeveloperKey(developerKey)
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  }

  return <div>TESTING GOOGLE DRIVE</div>;
};

export default GoogleChooser;
