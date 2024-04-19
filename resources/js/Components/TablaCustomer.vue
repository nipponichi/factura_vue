
<template>
    <div class="card p-fluid flex flex-wrap gap-3">
        

        <div class="flex-auto">
            <label for="phone" class="font-bold block mb-2">Phone</label>
            <InputMask id="phone" v-model="value2" mask="(99) 999-999-999" placeholder="(+34) 123-123-123" />
        </div>

       
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: '',
            value2: '',
            value3: ''
        }
    }
}
</script>

