<template>
    <header>
        <div class="website-titles">
            <h1>//CHRISTIAAN BRANT</h1>
            <h2>//PORTFOLIO</h2>
        </div>
        <nav>
            <ul>
                <li>Home</li>
                <li>Unity</li>
                <li>VR</li>
                <li>BodyTracking</li>
                <li>Drawings</li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
header {
    
    width: 100%;
    background-color: #34495e;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
}

.website-titles {
    margin: 0 auto;
    width: 30vw;
    text-align: left;
}

nav {
    margin: 0 auto;
    width: 50vw;
}

ul {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}

li {
    text-align: center;
}
</style>