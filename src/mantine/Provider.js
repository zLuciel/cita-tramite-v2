"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { Provider } from 'react-redux'; // Importa Provider
import store from "@/redux/store";

export function Providers({ children }) {
  return (
    <Provider store={store}> {/* Envuelve todo con Provider */}
      <MantineProvider forceColorScheme="light" theme="light" withNormalizeCSS>
        <ModalsProvider>
          <Notifications />
          {children}
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  );
}
