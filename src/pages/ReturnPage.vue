<template>
  <button
    style="background-color: mediumaquamarine; color: #000; margin-bottom: 20px"
    @click="$router.push('/')"
  >
    ← Go Home
  </button>

  <div class="container">
    <div
      style="
        color: black;
        font-weight: bold;
        padding: 5px;
        padding-left: 20px;
        background-color: #e5e4e2;
      "
    >
      <span style="font-size: x-small; font-weight: 900">˂</span>
      <span style="font-size: 13px; margin-left: 6px">Return Window</span>
    </div>

    <div class="card">
      <h3 style="color: black; margin-top: -6px; font-size: 14px;">Return Details</h3>

      <!-- Edit Mode -->
      <div v-if="isEditing" class="edit-section">
        <label>
          Return Date:
          <input v-model="formData.returnDate" type="date" />
        </label>

        <label>
          Product Name:
          <input v-model="formData.productName" type="text" />
        </label>

        <label>
          Seller:
          <input v-model="formData.seller" type="text" />
        </label>

        <label>
          Return Reason:
          <textarea v-model="formData.reason" placeholder="Describe reason..."></textarea>
        </label>

        <label>
          Refund Amount:
          <input v-model.number="formData.refundAmount" type="number" />
        </label>

        <label>
          Return Status:
          <select v-model="formData.status">
            <option>Pending</option>
            <option>Approved</option>
            <option>Refunded</option>
            <option>Rejected</option>
          </select>
        </label>

        <label>
          Upload Product Image:
          <input type="file" @change="onFileChange" />
        </label>

        <button @click="saveData">Save</button>
      </div>

      <!-- View Mode -->
      <div v-else class="view-section">
        <div class="product-card">
          <div class="product-info">
            <img :src="formData.image || defaultImage" alt="Product" />
            <div>
              <p class="product-name">{{ formData.productName }}</p>
              <p style="color: #808080; font-size: x-small; margin-top: -5px">
                Sold by:
                <span style="color: #0047ab">{{ formData.seller }}</span>
              </p>
              <p style="font-size: x-small; margin-bottom: 8px; margin-top: -5px">
                Refund: ₹{{ formData.refundAmount.toFixed(2) }}
              </p>
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #d3d3d3; margin: 7px 0" />

          <div class="summary-box">
            <div class="bill-details">
              <span>Return Requested:</span>
              <span>{{ formatDate(formData.returnDate) }}</span>
            </div>
            <div class="bill-details">
              <span>Status:</span>
              <span>{{ formData.status }}</span>
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #d3d3d3; margin: 7px 0" />

          <h4 style="font-weight: bold; margin-bottom: 3px; font-size: 13px">
            Return Reason
          </h4>
          <div class="ship-box">
            <div class="multiline">{{ formData.reason }}</div>
          </div>

          <hr style="border: none; border-top: 1px solid #d3d3d3; margin: 7px 0" />

          <div class="actions">
            <button>Track Return</button>
            <button>Contact Seller</button>
          </div>

          <button class="edit-btn" @click="isEditing = true">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isEditing = ref(true);
const defaultImage = "bounvita.png";

const formData = ref({
  returnDate: "2025-11-03",
  productName: "Cult Gym Bag for Men & Women – Black",
  seller: "Cult Sports",
  reason: "Item was defective upon arrival.",
  refundAmount: 799,
  status: "Pending",
  image: "",
});

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      formData.value.image = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const saveData = () => {
  isEditing.value = false;
};

const formatDate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options);
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f7f7f7;
  padding: 20px;
}

.container {
  width: 335px;
  margin: 0 auto;
  background: white;
  box-sizing: border-box;
}

.card {
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.edit-section label {
  display: block;
  margin-bottom: 10px;
  color: black;
}

.edit-section input,
.edit-section textarea,
.edit-section select {
  width: 100%;
  margin-top: 4px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.edit-section button {
  margin-top: 10px;
  padding: 8px 12px;
  cursor: pointer;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
  margin-top: 10px;
  color: black;
  font-size: 12px;
}

.multiline {
  white-space: pre-line;
  font-size: 12px;
}

.product-info {
  display: flex;
  gap: 10px;
}

.product-info img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.product-name {
  font-weight: bold;
  font-size: 11px;
}

.actions button {
  margin-right: 4px;
  border: 1px solid #d3d3d3;
  border-radius: 50px;
  font-size: 10px;
  padding: 6px 6px;
  background-color: #ffffff;
  color: black;
}

.edit-btn {
  margin-top: 30px;
  padding: 6px 12px;
  background: #ffd814;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.summary-box .bill-details {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 2px;
}
</style>
