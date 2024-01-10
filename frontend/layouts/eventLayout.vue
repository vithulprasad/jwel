<template>
  <div class="container-lg contain mt-2" >
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <!-- navabar
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
            Left part of the navbar
            <div class="navbar-left" >
              <a class="navbar-brand" href="/"><img src="/static/logo/LeftMenuLogo.svg" alt=""></a>
              <div class="navbar-icons">
                <a href="" class="navbar-icon"><img src="" alt="Icon 1" /></a>
                <a href="" class="navbar-icon"><img src="" alt="Icon 2" /></a>
                <a href="" class="navbar-icon"><img src="" alt="Icon 3" /></a>
                <a href="" class="navbar-icon"><img src="" alt="Icon 4" /></a>
                <a href="" class="navbar-icon"><img src="" alt="Icon 5" /></a>
              </div>
            </div>

            Right part of the navbar
            <div class="navbar-right">
              <div class="navbar-icons">
                <a href="" class="navbar-icon"
                  ><img src="" alt="Notification Icon"
                /></a>
                <a href="" class="navbar-icon"
                  ><img src="" alt="Profile Icon"
                /></a>
              </div>
            </div>
          </div>
        </nav> -->
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container">
            <!-- Left part of the navbar -->
            <div class="navbar-left">
              <img src="/static/logo/HeaderLogo.svg" alt="" />
              <div class="navbar-icons">
                <div
                  v-for="(page, index) in pages"
                  :key="index"
                  class="navbar-icon"
                  @click="changePage(index)"
                >
                  <div :class="{ active: activePage === index }">
                    <img
                      :src="`/static/icons/icon${index + 1}.svg`"
                      alt="Icon"
                    />
                    <span v-if="activePage === index">{{ page.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right part of the navbar -->
            <div class="navbar-right">
              <div class="navbar-icons">
                <a href="" class="navbar-icon"
                  ><img
                    src="/static/icons/Notificationn.svg"
                    alt="Notification Icon"
                /></a>
                <a href="" class="navbar-icon"
                  ><img src="/static/icons/Profile.svg" alt="Profile Icon"
                /></a>
              </div>
            </div>
          </div>
        </nav>

        <slot />
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<!-- <script>
export default {};
</script> -->

<!-- new gpt scripts -->
<script>
export default {
  data() {
    return {
      pages: [
        { name: "Page 1", icon: "/icons/icon1.svg" },
        { name: "Page 2", icon: "/icons/icon2.svg" },
        { name: "Page 3", icon: "/icons/icon3.svg" },
        { name: "Page 4", icon: "/icons/icon4.svg" },
      ],
      activePage: 0, // Index of the initially active page
    };
  },
  methods: {
    changePage(index) {
      this.activePage = index;
      // You can use Vue Router to navigate to the corresponding page here
      // For simplicity, I'm using console.log to indicate the page change
      console.log(`Navigating to ${this.pages[index].name}`);
    },
  },
};
</script>

<!-- <style scoped>
.navbar-left {
  display: flex;
  align-items: center;
  background-color: aqua;
}

.navbar-right {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.navbar-icons {
  display: flex;
}

.navbar-icon {
  margin-right: 10px; /* Adjust spacing between icons */
}
</style> -->

<!-- new gpt styles -->

<style scoped>

.navbar-left {
  display: flex;
  align-items: center;
  background-color: gainsboro;
  border-radius: 1rem;
}

.navbar-right {
  display: flex;
  align-items: center;
  margin-left: auto;
  background-color: gainsboro;
  border-radius: 1rem;
}

.navbar-icons {
  display: flex;
  margin: 0.5rem;
}

.navbar-icon {
  cursor: pointer;
  margin-right: 10px; /* Adjust spacing between icons */
}

.navbar-icon img {
  /* width: 24px;  */
}

.navbar-icon div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navbar-icon span {
  margin-top: 5px;
  display: none;
}

.navbar-icon.active span {
  display: block;
}

.active {
  background-color: #e0e0e0; /* Adjust the background color for the active icon */
}
</style>
