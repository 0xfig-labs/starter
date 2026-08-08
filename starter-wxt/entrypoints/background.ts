export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message) => {
    if (message?.type === 'options-ready') return Promise.resolve({ ok: true });
    return undefined;
  });
});
