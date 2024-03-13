<template>
  <div class="container bg-white rounded shadow" style="max-height: 100%">
    <button @click="goBack">Back</button>

    <div class="p-3">
      <div class="d-flex justify-content-between align-items-center">
        <h4>Add New Member</h4>
    
      </div>
      <h6>Members Added</h6>
      <small>no members added</small>

      <div>
        <v-card v-for="member in membersAdded" :key="member.id" flat>
          <div class="d-flex justify-content-between align-items-center">
            <img :src="member.avatar" alt="Avatar" class="avatar" />
            <span>{{ member.name }}</span>
            <button class="btn" @click="removeMember(member)">-</button>
          </div>
        </v-card>
      </div>

      <h6>Availble members</h6>

      <div>
        <v-card v-for="member in availableMembers" :key="member.id" flat>
          <div class="d-flex justify-content-between align-items-center">
            <img :src="member.avatar" alt="Avatar" class="avatar" />
            <span>{{ member.name }}</span>
            <button class="btn" @click="addMember(member)">+</button>
          </div>
        </v-card>
      </div>

      <!-- <div class="d-flex justify-content-between align-items-center">
        <v-card
          flat
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
          title="Avatars"
        >
        </v-card>
        <button class="btn">
          <img src="/static/icon/close_button.svg" alt="" />
        </button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["backToAddParty"]);

function goBack() {
  emit("backToAddParty");
}
const membersAdded = ref([]);

const availableMembers = ref([
  { id: 1, name: "John", avatar: "https://cdn.vuetifyjs.com/images/john.jpg" },
  {
    id: 2,
    name: "Alice",
    avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
  },
  { id: 3, name: "Bob", avatar: "https://cdn.vuetifyjs.com/images/john.jpg" },
]);
function addMember(member) {
  const index = availableMembers.value.findIndex((m) => m.id === member.id);
  if (index !== -1) {
    availableMembers.value.splice(index, 1);
    membersAdded.value.push(member);
  }
}

function removeMember(member) {
  const index = membersAdded.value.findIndex((m) => m.id === member.id);
  if (index !== -1) {
    membersAdded.value.splice(index, 1);
    availableMembers.value.push(member);
  }
}
</script>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
}
</style>
