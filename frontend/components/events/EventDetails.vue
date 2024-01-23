<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 mx-auto">
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="card-title event_title">About This event</h5>
            <p class="card-text event_description">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
          </div>
        </div>
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="card-title date_venue">Date and Venue</h5>

            <div class="d-flex justify-content-between">
              <div class="d-flex align-items-center">
                <img src="/static/icon/Frame.svg" alt="..." />
                <p class="pl-3 pt-4 date_time">
                  24 Feb, 2023, 09:00 AM <br />
                  <small class="text-body-secondary time_tag">
                    Even Starts</small
                  >
                </p>
              </div>
              <div class="d-flex align-items-center">
                <img src="/static/icon/hourglass_bottom.svg" alt="..." />
                <p class="pl-3 pt-4 date_time">
                  24 Feb, 2023, 09:00 AM <br />
                  <small class="text-body-secondary time_tag"> Even ends</small>
                </p>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <div class="d-flex align-items-center">
                <img src="/static/icon/orient.svg" alt="..." />
                <p class="pl-3 pt-4 date_time">
                  24 Feb, 2023, 09:00 AM <br />
                  <small class="text-body-secondary time_tag">
                    Orientation Date</small
                  >
                </p>
              </div>

              <div class="d-flex align-items-center">
                <img src="/static/icon/orient_venue.svg" alt="..." />
                <p class="pl-3 pt-4 date_time">
                  24 Feb, 2023, 09:00 AM <br />
                  <small class="text-body-secondary time_tag">
                    Orientation Venue</small
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="card-title co-ordinators">Co ordinators</h5>
            <div class="d-flex">
              <v-chip pill v-bind="props" link>
                <v-avatar start>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/john.png"
                  ></v-img>
                </v-avatar>

                John Leider
                <v-chip class="ml-2" color="primary" size="x-small">
                  speaker</v-chip
                >
              </v-chip>
            </div>
          </div>
        </div>
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="card-title ministries">Ministries</h5>
            <div class="d-flex">
              <v-chip> Ministry of public affairs </v-chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.card {
  border-width: 0cap;
}
.date_time {
  font-size: 14px;
  line-height: 1rem;
  font-weight: 500;
  color: #3c4c7c;
}
.time_tag {
  font-size: 12px;
  font-weight: 600;
  line-height: 1rem;
  color: #6e7ca8;
}
.event_title {
  font-size: 14px;
  line-height: 1rem;
  font-weight: 600;
  font-family: Inter;

  color: #3c4c7c;
  word-wrap: break-word;
}
.event_description {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #3c4c7c;
}
.date_venue {
  color: #3c4c7c;
  font-size: 14px;
  font-family: Inter;
  font-weight: 600;
  line-height: 16px;
  word-wrap: break-word;
}
.co-ordinators {
  color: #3c4c7c;
  font-size: 14px;
  font-family: Inter;
  font-weight: 600;
  line-height: 16px;
  word-wrap: break-word;
}
.ministries {
  color: #3c4c7c;
  font-size: 14px;
  font-family: Inter;
  font-weight: 600;
  line-height: 16px;
  word-wrap: break-word;
}
</style>
