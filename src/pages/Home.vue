<template>
  <div class="home-container">
    <h1>Welcome</h1>
    <p>Select an option below:</p>

    <div class="buttons">
      <button @click="$router.push('/order')">Generate Order Window</button>
      <button @click="$router.push('/return')">Generate Return Window</button>
    </div>
  </div>
</template>

<style>
.home-container {
  text-align: center;
  margin-top: 100px;
  font-family: Arial, sans-serif;
}
.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}
button {
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  background: #0073e6;
  color: white;
  transition: 0.3s;
}
button:hover {
  background: #005bb5;
}
</style>
