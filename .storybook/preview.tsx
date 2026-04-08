import type { Preview } from "@storybook/nextjs";
import { NextIntlClientProvider } from "next-intl";
import React from "react";
import "../src/app/globals.css";
import fr from "../messages/fr.json";

const preview: Preview = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="fr" messages={fr}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
