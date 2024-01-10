<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
            <!-- Left part of the navbar -->
            <div class="navbar-left bg-white shadow-sm d-flex rounded-3">
                <img src="/static/logo/HeaderLogo.svg" alt="" class="px-2" />
                <div class="navbar-icons d-flex p-2">
                    <div v-for="(page, index) in pages" :key="index" class="navbar-icon py-1 px-2 rounded-3" :class="{ active: currentRouteName === page.path }">
                        <a :href="page.path" class="nav-atag">
                            <img :src="'/_nuxt/static'+page.icon" alt="Icon" />&nbsp;
                            <span v-if="currentRouteName === page.path">{{ page.name }}</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Right part of the navbar -->
            <div class="navbar-right bg-white shadow-sm  rounded-3">
                <div class="navbar-icons p-2">
                    <a href="" class="navbar-icon px-1"><img src="/static/icons/Notificationn.svg"
                            alt="Notification Icon" /></a>
                    <a href="" class="navbar-icon px-1"><img src="/static/icons/Profile.svg" alt="Profile Icon" /></a>
                </div>
            </div>
        </div>
    </nav>

</template>

<script>
    export default {
        data() {
            return {
                pages: [
                    { name: "Events", icon: "/icons/icon1.svg", path: "events"},
                    { name: "School", icon: "/icons/icon2.svg", path: "school" },
                    { name: "Page 3", icon: "/icons/icon3.svg" },
                    { name: "Page 4", icon: "/icons/icon4.svg" },
                ],
                currentRouteName: '',
            };
        },
        mounted(){
            this.currentRouteName = this.$route.name;
        },
        methods: {
        },
    };
</script>

<style scoped>
    .navbar-left{
        color:#6E7CA8;
        font-size:14px;
    }
    .active {
        background-color: #F1F2F8;
        color:#3C4C7C !important;
        font-weight: bold;
    }
    .nav-atag{
        text-decoration: none;
        color: inherit;
    }
</style>