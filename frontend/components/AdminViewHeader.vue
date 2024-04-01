<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <!-- Left part of the navbar -->
      <div class="navbar-left bg-white shadow d-flex rounded-3">
        <img src="/static/logo/HeaderLogo.svg" alt="" class="px-2" />
        <div class="navbar-icons d-flex p-2">
          <div
            v-for="(page, index) in pages"
            :key="index"
            class="navbar-icon py-1 px-2 rounded-3"
            :class="{ active: currentRouteName === page.path }"
          >
            <a :href="page.path" class="nav-atag">
              <img
                v-if="currentRouteName === page.path"
                :src="page.activeIcon"
                alt="Active Icon"
              />
              <img v-else :src="page.inactiveIcon" alt="Inactive Icon" />
              &nbsp;
              <span v-if="currentRouteName === page.path">{{ page.name }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Right part of the navbar -->
      <div class="navbar-right bg-white shadow rounded-3">
        <div class="navbar-icons p-2">
          <a href="" class="navbar-icon px-1"
            ><img src="/static/icons/Notificationn.svg" alt="Notification Icon"
          /></a>
          <a href="" class="navbar-icon px-1"
            ><img src="/static/icons/Profile.svg" alt="Profile Icon"
          /></a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const pages = ref([
  {
    name: "Events",
    activeIcon: "/icons/Active_Events.svg",
    inactiveIcon: "/icons/Inactive_Events.svg",
    path: "events",
  },
  {
    name: "Users",
    activeIcon: "/icons/Active_Users.svg",
    inactiveIcon: "/icons/Inactive_Users.svg",
    path: "users",
  },
  {
    name: "Schools",
    activeIcon: "/icons/Active_Schools.svg",
    inactiveIcon: "/icons/Inactive_Schools.svg",
    path: "schools",
  },
  {
    name: "Ministries",
    activeIcon: "/icons/Active_Ministries.svg",
    inactiveIcon: "/icons/Inactive_Ministries.svg",
    path: "ministries",
  },
  {
    name: "Bills",
    activeIcon: "/icons/Active_Ministries.svg",
    inactiveIcon: "/icons/Inactive_Ministries.svg",
    path: "bills",
  },
]);

const currentRouteName = ref("");
const route = useRoute();
console.log(route.name, "route,name");

onMounted(() => {
  currentRouteName.value = route.name;
});
</script>

<style scoped>
.navbar-left {
  color: #6e7ca8;
  font-size: 14px;
}
.active {
  background-color: #f1f2f8;
  color: #3c4c7c !important;
  font-weight: bold;
}
.nav-atag {
  text-decoration: none;
  color: inherit;
}
</style>
