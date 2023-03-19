<template>
  <div>
    PUSHER!

    <pre>
      data: {{ data }}
    </pre>

    <button class="block" @click="execute">execute</button> 
    <button @click="resetPusher">resetPusher</button>

    <pre>
      messages: {{ messages }}
    </pre>
  </div>
</template>

<script setup>
import PusherJS from "pusher-js";

let client = ref(null);

const resetPusher = () => {
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
};

onMounted(() => {
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
});

let messages = ref([]);

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

const { data, execute } = await useAPI("/pusher");

PusherJS.logToConsole = false;

client.value.subscribe("chat-room").bind("new-message", ({ message }) => {
  logger.info(`Received: ${message}`);
  messages.value.push(message);
});
</script>
