<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
    import {Prop, Vue, Component, Watch} from "vue-property-decorator";

    @Component({
        name: 'ParentView'
    })
    export default class ParentView extends Vue {
    
    }
</script>
