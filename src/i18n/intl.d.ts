import type { MessageKey } from './messages';

/**
 * Augment react-intl's global types so every message `id` is constrained to the
 * keys that actually exist in en.json
 */
declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: MessageKey;
    }
  }
}
