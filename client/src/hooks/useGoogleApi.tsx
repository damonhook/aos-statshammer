import loadScript from 'load-script';
import { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

type TGapiState = 'loading' | 'ready' | 'authed' | 'error';

type TPickerVaraint = 'import' | 'export';

interface IPicker {
  variant: TPickerVaraint;
  setVisible: (v: boolean) => void;
}

const GOOGLE_SDK_URL = 'https://apis.google.com/js/api.js';
const API_KEY = 'AIzaSyCrsTCtNSfZnWjklfG-gSXWDE-R2zX9K-Q';
const CLIENT_ID = '360651691028-ceuc9mee53gjhtmpoetsb58ac57lcbgo.apps.googleusercontent.com';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPE = 'https://www.googleapis.com/auth/drive.file';

const useGoogleApi = () => {
  const [state, setState] = useState<TGapiState>('loading');

  const doAuth = useCallback((authCallback?: () => void) => {
    // console.log(window.gapi.auth.getToken().access_token, window.gapi.auth.getToken().expires_in);
    // if (state !== 'loading' && state !== 'authed') {
    window.gapi.auth.authorize({ client_id: CLIENT_ID, scope: SCOPE, immediate: true }, result => {
      if (result && !result.error) {
        setState('authed');
      } else setState('error');
      if (authCallback) authCallback();
    });
    // } else if (authCallback) authCallback();
  }, []);

  const onClientLoad = useCallback(() => {
    window.gapi.client
      .init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPE,
      })
      .then(() => {
        setState('ready');
      });
  }, []);

  useEffect(() => {
    loadScript(GOOGLE_SDK_URL, () => {
      window.gapi.load('client:auth2:picker', onClientLoad);
    });
  }, [onClientLoad]);

  const createPicker = (variant: TPickerVaraint, pickerCallback: (data: any) => void): IPicker => {
    const view = new window.google.picker.DocsView(window.google.picker.ViewId.DOCS)
      .setMimeTypes('application/json')
      .setIncludeFolders(true)
      .setParent('root');
    const token = window.gapi.client.getToken().access_token;
    console.log(token);
    return (
      new window.google.picker.PickerBuilder()
        // .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
        // .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId('360651691028')
        .setOAuthToken(token)
        .addView(view)
        // .addView(window.google.picker.ViewId.FOLDERS)
        .setSelectableMimeTypes('application/json')
        .setDeveloperKey(API_KEY)
        .setCallback(pickerCallback)
        .build()
    );
  };

  return {
    state,
    doAuth,
    gapi: window.gapi,
    createPicker,
  };
};

export default useGoogleApi;
