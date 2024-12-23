import {ref} from "vue";

export function resetForm(refName) {
    for (const item in refName) {
        refName[item] = ref(refName[item]);
    }
}