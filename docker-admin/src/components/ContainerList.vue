<template>
    <div>
        <v-data-table
        :headers="headers"
        :items="containers"
        hide-actions
        class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.Names[0] }}</td>
                <td>{{ props.item.Image }}</td>
                <td>{{ props.item.Command }}</td>
                <td>{{ props.item.State }}</td>
                <td>{{ props.item.Status }}</td>
                <td><v-progress-circular indeterminate size="24" v-if="props.item.commandRunning"></v-progress-circular>
                    <a v-else href="#" @click="stopContainer(props.item)" alt="Stop container"><v-icon class="danger" >block</v-icon></a>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
const axios = require("axios");
let timer = null;

export default {
  name: "ContainerList",
  mounted() {
    this.updateContainers();
    timer = setInterval(() => this.updateContainers(), 2000, {
      immediate: true
    });
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Image", value: "image" },
        { text: "Command", value: "command" },
        { text: "State", value: "state" },
        { text: "Status", value: "status" },
        { text: "", value: "execute" }
      ],
      containers: [],
      stopContainer(container) {
        var idx = this.containers.findIndex(ele => ele.Id === container.Id);
        this.containers[idx].commandRunning = true;
        axios
          .get("http://localhost:9000/api/stopcontainer", {
            params: { containerId: container.Id }
          })
          .then(res => {
            console.log("successfully stopped container " + container.Id);
            this.updateContainers();
            this.containers[idx].commandRunning = false;
          })
          .catch(err => {
            this.containers[idx].commandRunning = false;
            console.log(err);
          });
      },
      updateContainers() {
        axios
          .get("http://localhost:9000/api/listcontainers")
          .then(res => {
            res.data.forEach(val => (val.commandRunning = false));
            this.containers = res.data;
            this.containers.sort((a, b) => {
              if (a.Names && b.Names) {
                return a.Names[0].localeCompare(b.Names[0]);
              }
              return 0;
            });
          })
          .catch(err => console.log(err));
      }
    };
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
a .danger {
  color: red;
}
</style>