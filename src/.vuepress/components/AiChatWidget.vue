<template>
  <Teleport v-if="mounted" to="body">
    <div class="ai-chat-widget">
      <button
        v-if="!isOpen"
        class="ai-chat-toggle"
        type="button"
        aria-label="打开 AI 助手"
        title="AI 助手"
        @click="openPanel"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3 13.7 8.3 19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Zm6.4 10.6.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2ZM5.7 14.8l1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1 1-2.8Z"
          />
        </svg>
        <span>AI</span>
      </button>

      <section
        v-else
        class="ai-chat-panel"
        role="dialog"
        aria-label="AI 助手"
      >
        <header class="ai-chat-header">
          <div class="ai-chat-title">
            <span class="ai-chat-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 3 13.7 8.3 19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Zm6.4 10.6.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"
                />
              </svg>
            </span>
            <span>AI 助手</span>
          </div>

          <div class="ai-chat-actions">
            <button
              type="button"
              class="ai-icon-button"
              :disabled="!canClear"
              aria-label="删除对话"
              title="删除对话"
              @click="clearConversation"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-2 6h10l-.8 11H7.8L7 9Zm3 2v7h2v-7h-2Zm4 0v7h2v-7h-2Z"
                />
              </svg>
            </button>
            <button
              type="button"
              class="ai-icon-button"
              aria-label="关闭"
              title="关闭"
              @click="isOpen = false"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="m12 10.6 4.95-4.95 1.4 1.4L13.4 12l4.95 4.95-1.4 1.4L12 13.4l-4.95 4.95-1.4-1.4L10.6 12 5.65 7.05l1.4-1.4L12 10.6Z"
                />
              </svg>
            </button>
          </div>
        </header>

        <div ref="messageList" class="ai-chat-messages">
          <p v-if="messages.length === 0" class="ai-empty-state">
            问我关于博客内容的问题。
          </p>

          <article
            v-for="message in messages"
            :key="message.id"
            class="ai-chat-message"
            :class="[`ai-chat-message-${message.role}`, { error: message.error }]"
          >
            <div class="ai-message-label">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 4h16v12H7.8L4 19.8V4Zm2 2v9l1-1h11V6H6Z"
                />
              </svg>
              <span>{{ message.role === "user" ? "You" : "AI" }}</span>
            </div>

            <p class="ai-message-content">
              {{ message.pending ? "思考中..." : message.content }}
            </p>

            <details
              v-if="message.role === 'assistant' && message.sources?.length"
              class="ai-sources"
            >
              <summary>来源</summary>
              <ul>
                <li v-for="source in message.sources" :key="sourceKey(source)">
                  <a
                    v-if="source.url || source.path"
                    :href="source.url || source.path"
                    :target="source.url ? '_blank' : undefined"
                    :rel="source.url ? 'noreferrer' : undefined"
                  >
                    {{ source.title || source.heading || source.path || source.url }}
                  </a>
                  <span v-else>
                    {{ source.title || source.heading || "未命名来源" }}
                  </span>
                  <small v-if="source.heading">{{ source.heading }}</small>
                </li>
              </ul>
            </details>
          </article>
        </div>

        <form class="ai-chat-form" @submit.prevent="sendQuestion">
          <textarea
            ref="inputRef"
            v-model="question"
            rows="2"
            placeholder="Ask a question..."
            :disabled="isSending"
            @keydown.enter.exact.prevent="sendQuestion"
          />
          <button
            class="ai-send-button"
            type="submit"
            :disabled="!canSend"
            aria-label="发送"
            title="发送"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 20 21 12 3 4v6l11 2-11 2v6Z" />
            </svg>
          </button>
        </form>
      </section>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";

declare const __RAG_BACKEND_URL__: string;

interface SourceResponse {
  title?: string;
  path?: string;
  url?: string;
  heading?: string;
  score?: number;
}

interface ChatResponse {
  answer?: string;
  sources?: SourceResponse[];
  traceId?: string;
  usedReranker?: boolean;
}

interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessage extends ChatHistoryItem {
  id: string;
  sources?: SourceResponse[];
  traceId?: string;
  pending?: boolean;
  error?: boolean;
}

const mounted = ref(false);
const isOpen = ref(false);
const isSending = ref(false);
const question = ref("");
const conversationId = ref("");
const messages = ref<ChatMessage[]>([]);
const messageList = ref<HTMLElement>();
const inputRef = ref<HTMLTextAreaElement>();

const apiBase =
  (__RAG_BACKEND_URL__ ||
    (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
      ?.VITE_RAG_BACKEND_URL ||
    ""
  ).replace(/\/$/, "");

const canSend = computed(() => question.value.trim().length > 0 && !isSending.value);
const canClear = computed(
  () => messages.value.length > 0 || question.value.trim().length > 0,
);

const createId = (): string => {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const scrollToBottom = async (): Promise<void> => {
  await nextTick();

  if (messageList.value) {
    messageList.value.scrollTop = messageList.value.scrollHeight;
  }
};

const focusInput = async (): Promise<void> => {
  await nextTick();
  inputRef.value?.focus();
};

const openPanel = (): void => {
  isOpen.value = true;
  void focusInput();
};

const clearConversation = (): void => {
  messages.value = [];
  question.value = "";
  conversationId.value = createId();
  void focusInput();
};

const getHistory = (): ChatHistoryItem[] =>
  messages.value
    .filter((message) => !message.pending && !message.error)
    .map(({ role, content }) => ({ role, content }));

const sourceKey = (source: SourceResponse): string =>
  `${source.url ?? source.path ?? source.title ?? "source"}-${source.heading ?? ""}`;

const sendQuestion = async (): Promise<void> => {
  const text = question.value.trim();

  if (!text || isSending.value) return;

  const history = getHistory();
  const userMessage: ChatMessage = {
    id: createId(),
    role: "user",
    content: text,
  };
  const assistantMessage: ChatMessage = {
    id: createId(),
    role: "assistant",
    content: "",
    pending: true,
  };

  messages.value.push(userMessage, assistantMessage);
  question.value = "";
  isSending.value = true;
  void scrollToBottom();

  try {
    if (!apiBase) {
      throw new Error("未配置 RAG 后端地址");
    }

    const response = await fetch(`${apiBase}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: text,
        conversationId: conversationId.value,
        history,
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = (await response.json()) as ChatResponse;

    assistantMessage.content = data.answer?.trim() || "暂时没有获取到回答。";
    assistantMessage.sources = data.sources ?? [];
    assistantMessage.traceId = data.traceId;
    assistantMessage.pending = false;
  } catch (error) {
    assistantMessage.content =
      error instanceof Error
        ? `请求失败：${error.message}`
        : "请求失败，请稍后再试。";
    assistantMessage.pending = false;
    assistantMessage.error = true;
  } finally {
    isSending.value = false;
    void scrollToBottom();
    void focusInput();
  }
};

onMounted(() => {
  conversationId.value = createId();
  mounted.value = true;
});
</script>

<style scoped>
.ai-chat-widget {
  position: fixed;
  inset-inline-end: 1rem;
  bottom: calc(8rem + env(safe-area-inset-bottom));
  z-index: 101;
  color: var(--vp-c-text);
}

.ai-chat-toggle {
  display: inline-flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border: 1px solid var(--vp-c-border);
  border-radius: 50%;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-accent);
  box-shadow: 2px 2px 10px 4px var(--vp-c-shadow);
  cursor: pointer;
  font-weight: 700;
  line-height: 1;
  transition:
    background var(--vp-t-color),
    border-color var(--vp-t-color),
    color var(--vp-t-color),
    transform var(--vp-t-transform);
}

.ai-chat-toggle:hover {
  color: var(--vp-c-accent-hover);
  transform: translateY(-2px);
}

.ai-chat-toggle svg,
.ai-chat-mark svg,
.ai-icon-button svg,
.ai-send-button svg,
.ai-message-label svg {
  width: 1.25em;
  height: 1.25em;
  fill: currentColor;
  flex: none;
}

.ai-chat-panel {
  display: grid;
  width: min(420px, calc(100vw - 2rem));
  height: min(640px, calc(100vh - 7rem));
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: 0 12px 36px var(--vp-c-shadow);
  grid-template-rows: auto 1fr auto;
}

.ai-chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  padding: 0.85rem 1rem;
}

.ai-chat-title,
.ai-chat-actions,
.ai-message-label {
  display: flex;
  align-items: center;
}

.ai-chat-title {
  min-width: 0;
  gap: 0.5rem;
  color: var(--vp-c-text);
  font-size: 1rem;
  font-weight: 700;
}

.ai-chat-mark {
  display: inline-flex;
  color: var(--vp-c-accent);
}

.ai-chat-actions {
  gap: 0.35rem;
}

.ai-icon-button,
.ai-send-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text);
  cursor: pointer;
  transition:
    background var(--vp-t-color),
    border-color var(--vp-t-color),
    color var(--vp-t-color);
}

.ai-icon-button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: transparent;
}

.ai-icon-button:hover,
.ai-send-button:hover {
  border-color: var(--vp-c-accent);
  color: var(--vp-c-accent);
}

.ai-icon-button:disabled,
.ai-send-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.ai-chat-messages {
  min-height: 0;
  overflow-y: auto;
  background: var(--vp-c-bg);
  padding: 1rem;
  scrollbar-width: thin;
}

.ai-empty-state {
  margin: 0;
  color: var(--vp-c-text-mute);
  font-size: 0.95rem;
}

.ai-chat-message {
  margin: 0 0 1rem;
}

.ai-chat-message:last-child {
  margin-bottom: 0;
}

.ai-chat-message-user {
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 0.85rem;
}

.ai-chat-message-assistant {
  padding: 0.25rem 0;
}

.ai-chat-message.error .ai-message-content {
  color: var(--vp-c-red-text);
}

.ai-message-label {
  gap: 0.4rem;
  margin-bottom: 0.45rem;
  color: var(--vp-c-text);
  font-size: 0.9rem;
  font-weight: 700;
}

.ai-chat-message-assistant .ai-message-label {
  color: var(--vp-c-accent);
}

.ai-message-content {
  margin: 0;
  color: var(--vp-c-text);
  line-height: 1.7;
  white-space: pre-wrap;
}

.ai-sources {
  margin-top: 0.85rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.ai-sources summary {
  cursor: pointer;
  padding: 0.65rem 0.75rem;
  color: var(--vp-c-text);
  font-weight: 700;
}

.ai-sources ul {
  margin: 0;
  padding: 0 0.75rem 0.75rem 1.8rem;
}

.ai-sources li {
  margin: 0.45rem 0;
}

.ai-sources small {
  display: block;
  margin-top: 0.15rem;
  color: var(--vp-c-text-mute);
}

.ai-chat-form {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  padding: 0.85rem;
}

.ai-chat-form textarea {
  min-width: 0;
  max-height: 8rem;
  resize: vertical;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  padding: 0.65rem 0.75rem;
  font: inherit;
  line-height: 1.5;
  outline: none;
  transition:
    border-color var(--vp-t-color),
    background var(--vp-t-color);
}

.ai-chat-form textarea:focus {
  border-color: var(--vp-c-accent);
}

.ai-send-button {
  width: 42px;
  height: 42px;
  align-self: end;
  border-radius: 50%;
  background: var(--vp-c-accent-bg);
  color: var(--vp-c-white);
}

.ai-send-button:hover {
  background: var(--vp-c-accent-hover);
  color: var(--vp-c-white);
}

@media (max-width: 959px) {
  .ai-chat-widget {
    transform-origin: 100% 100%;
  }

  .ai-chat-toggle {
    transform: scale(0.8);
  }

  .ai-chat-toggle:hover {
    transform: scale(0.8) translateY(-2px);
  }
}

@media (max-width: 719px) {
  .ai-chat-widget {
    inset-inline: 0.75rem;
    bottom: calc(1rem + env(safe-area-inset-bottom));
  }

  .ai-chat-panel {
    width: auto;
    height: min(680px, calc(100vh - 2rem));
  }

  .ai-chat-toggle {
    margin-inline-start: auto;
  }
}

@media print {
  .ai-chat-widget {
    display: none;
  }
}
</style>
