import Script from "next/script";

export function LeadConnectorWidget() {
  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6a486979c579066080db2ef3"
      data-source="WEB_USER"
      strategy="lazyOnload"
    />
  );
}
