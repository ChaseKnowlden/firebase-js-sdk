/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FirebaseOptions, FirebaseApp } from '@firebase/app-types';
import {
  Provider,
  ComponentContainer,
  Component,
  ComponentType
} from '@firebase/component';
import { FirebaseAuthInternalName } from '@firebase/auth-interop-types';
import { FirebaseMessagingName } from '@firebase/messaging-types';
import { AppCheckInternalComponentName } from '@firebase/app-check-interop-types';
import { Service } from '../src/api/service';
import nodeFetch from 'node-fetch';

export function makeFakeApp(options: FirebaseOptions = {}): FirebaseApp {
  options = {
    apiKey: 'apiKey',
    projectId: 'projectId',
    authDomain: 'authDomain',
    messagingSenderId: '1234567890',
    databaseURL: 'databaseUrl',
    storageBucket: 'storageBucket',
    appId: '1:777777777777:web:d93b5ca1475efe57',
    ...options
  };
  return {
    name: 'appName',
    options,
    automaticDataCollectionEnabled: true,
    delete: async () => {}
  };
}

export function getFetchImpl(): typeof fetch {
  return typeof window !== 'undefined'
    ? fetch.bind(window)
    : (nodeFetch as any);
}

export function createTestService(
  app: FirebaseApp,
  regionOrCustomDomain?: string,
  authProvider = new Provider<FirebaseAuthInternalName>(
    'auth-internal',
    new ComponentContainer('test')
  ),
  messagingProvider = new Provider<FirebaseMessagingName>(
    'messaging',
    new ComponentContainer('test')
  ),
  fakeAppCheckToken = 'dummytoken',
  fetchImpl = getFetchImpl()
): Service {
  const appCheckProvider = new Provider<AppCheckInternalComponentName>(
    'app-check-internal',
    new ComponentContainer('test')
  );
  appCheckProvider.setComponent(
    new Component(
      'app-check-internal',
      () => {
        return {
          getToken: () => Promise.resolve({ token: fakeAppCheckToken })
        } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      },
      ComponentType.PRIVATE
    )
  );
  const functions = new Service(
    app,
    authProvider,
    messagingProvider,
    appCheckProvider,
    regionOrCustomDomain,
    fetchImpl
  );
  const useEmulator = !!process.env.FIREBASE_FUNCTIONS_EMULATOR_ORIGIN;
  if (useEmulator) {
    functions.useFunctionsEmulator(
      process.env.FIREBASE_FUNCTIONS_EMULATOR_ORIGIN!
    );
  }
  return functions;
}
