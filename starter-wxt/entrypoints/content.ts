export default defineContentScript({
  matches: ['https://example.com/*'],
  main() {
    const banner = document.createElement('aside');
    banner.textContent = 'WXT content script is running';
    banner.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:2147483647;padding:8px 12px;border-radius:8px;background:#111;color:#fff;font:14px system-ui';
    document.body.appendChild(banner);
  },
});
