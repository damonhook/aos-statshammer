import loadScript from 'load-script';
import React, { useCallback, useEffect, useState } from 'react';

const GOOGLE_SDK_URL = 'https://apis.google.com/js/api.js';
const API_KEY = 'AIzaSyCrsTCtNSfZnWjklfG-gSXWDE-R2zX9K-Q';
const CLIENT_ID = '360651691028-ceuc9mee53gjhtmpoetsb58ac57lcbgo.apps.googleusercontent.com';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPE = 'https://www.googleapis.com/auth/drive.file';

interface IGoogleApiProvider {
  ready: boolean;
  checkAuth: (authCallback?: (() => void) | undefined) => void;
  pickerBuilder: () => google.picker.PickerBuilder;
  gapi: typeof window.gapi;
  picker: typeof window.google.picker;
}

const GoogleApiContext = React.createContext<IGoogleApiProvider | void>(undefined);

const GoogleApiProvider: React.FC = ({ children }) => {
  const [ready, setReady] = useState(false);

  const handleAuthorize = (immediate = true, authCallback?: () => void) => {
    window.gapi.auth.authorize({ client_id: CLIENT_ID, scope: SCOPE, immediate }, result => {
      if (result && !result.error) {
        if (authCallback) authCallback();
      } else if (immediate) handleAuthorize(false, authCallback);
      else if (authCallback) authCallback();
    });
  };

  const checkAuth = (authCallback?: () => void) => {
    handleAuthorize(true, authCallback);
  };

  const onClientLoad = useCallback(() => {
    window.gapi.client
      .init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPE,
      })
      .then(() => {
        setReady(true);
      });
  }, []);

  useEffect(() => {
    loadScript(GOOGLE_SDK_URL, () => {
      window.gapi.load('client:auth2:picker', onClientLoad);
    });
  }, [onClientLoad]);

  const pickerBuilder = () => {
    const token = window.gapi.client.getToken()?.access_token;
    return new window.google.picker.PickerBuilder()
      .setAppId('360651691028')
      .setOAuthToken(token)
      .setDeveloperKey(API_KEY);
  };

  return (
    <GoogleApiContext.Provider
      value={{
        ready,
        checkAuth,
        pickerBuilder,
        gapi: window.gapi,
        picker: window.google?.picker,
      }}
    >
      {children}
    </GoogleApiContext.Provider>
  );
};

const useGoogleApi = () => {
  const context = React.useContext(GoogleApiContext);
  if (context === undefined) {
    throw new Error('useGoogleApi must be used within a GoogleApiProvider');
  }
  return context;
};

export { GoogleApiProvider, useGoogleApi };
