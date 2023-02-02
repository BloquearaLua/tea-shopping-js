<template>
    <div class="title">
        <slot>
            <span>爆款推荐</span>
        </slot>
    </div>
</template>

<script>

export default {
    name: 'Card',
}
</script>

<style scoped>
.title {
    padding: 0.37rem 0;
    width: 100%;
    text-align: center;
    font-size: 0.43rem;
}

.title span {
    position: relative;
}
.title span::before {
    content: '';
    position: absolute;
    display: block;
    top: 50%;
    left: -0.5rem;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d4c0a7;
    margin-top: -4px;
}

.title span::after {
    content: '';
    position: absolute;
    display: block;
    top: 50%;
    right: -0.5rem;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d4c0a7;
    margin-top: -4px;
}
</style>