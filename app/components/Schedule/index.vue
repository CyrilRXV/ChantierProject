<script lang="ts" setup>
const calendar = ref();

const today = ref(new Date().toISOString());
const events = [
  {
    worksiteName: 'Chantier A, placo',
    start: '2026-01-26 09:00',
    end: '2026-01-26 10:00',
  },
  {
    worksiteName: `Thomas' Birthday`,
    start: '2026-01-26',
  },
  {
    worksiteName: 'Chantier B, Démolition',
    start: '2026-01-26 11:00',
    end: '2026-01-26 12:00',
  },
];

onMounted(() => {
  calendar.value.scrollToTime('08:00')
});
</script>

<template>
  <div>
    <h1>Planning</h1>
    <v-row>
      <v-col>
        <v-sheet height="400">
          <v-calendar
            ref="calendar"
            :events="events"
            :model-value="today"
            :now="today"
            color="primary"
            type="week"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 2px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
