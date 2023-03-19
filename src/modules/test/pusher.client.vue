<template>
  <div>
    PUSHER!

    <UiJSON
      class="mx-auto"
      :json="{
        vibrationIsSupported: isSupported,
        isOnline,
        offlineAt,
      }"
    />

    <div v-if="!isOnline">YOU ARE NOT CONNECTED CHECK YUR NETWORK</div>

    <button
      class="block m-3 bg-red-500 rounded-lg p-3 text-white"
      @click="clearMessages"
    >
      clearMessages
    </button>

    <button
      class="block m-3 bg-red-500 rounded-lg p-3 text-white"
      @click="sendMessage"
    >
      sendMessage
    </button>

    <button
      class="block m-3 bg-red-500 rounded-lg p-3 text-white"
      @click="setPusher"
    >
      setPusher
    </button>

    <pre>
      messages: {{ messages }}
    </pre>
  </div>
</template>

<script setup>
import PusherJS from "pusher-js";

const { vibrate, isSupported } = useVibrate({ pattern: [300, 100, 300] });

const { isOnline, offlineAt } = useNetwork();

let client = ref(null);
let channel = ref(null);
let messages = ref([]);

const { data, execute } = await useApi("/pusher");

PusherJS.logToConsole = false;

function subscribeToChannels() {
  channel.value?.unbind?.();
  channel.value = client.value.subscribe("chat-room");
  channel.value.bind("new-message", ({ message }) => {
    logger.info(`Received: ${message}`);
    messages.value.push(message);
  });
}

function clearMessages() {
  messages.value = [];
}

function setPusher() {
  client.value = new PusherJS("8efe3b5d-d99f-4e67-b1e9-39c8e3c49774", {
    wsHost:
      "clau-platform-6a998e8f-4990-48ac-9304-5c5b98f6d694.fro-dev-clau.workers.dev",
    wsPort: 443,
    wssPort: 443,
    forceTLS: true,
    encrypted: true,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
    cluster: "",
  });

  subscribeToChannels();

  logger.info(`Connect to channels`);
}

async function sendMessage() {
  vibrate();
  await execute();
  setPusher();
}

onMounted(() => {
  setPusher();

  setInterval(() => {
    setPusher();
  }, 10 * 1000);
});
</script>
